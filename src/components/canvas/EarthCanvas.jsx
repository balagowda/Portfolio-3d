import { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useTexture, Line } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from './Loader';

// Helper to create Bezier arcs on the earth sphere of radius 2.5
const createArc = (startVec, endVec, height = 0.5) => {
  const start = startVec.clone().normalize().multiplyScalar(2.5);
  const end = endVec.clone().normalize().multiplyScalar(2.5);
  const mid = start.clone().add(end).normalize().multiplyScalar(2.5 + height);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
};

const FlyingArc = ({ curve, speed, delay, color }) => {
  const divisions = 24;
  const trailLength = 0.2; // Length of the flying pulse segment (20% of curve)
  
  const fullPoints = useMemo(() => {
    if (!curve) return [];
    return curve.getPoints(divisions);
  }, [curve]);

  const [pulsePoints, setPulsePoints] = useState(() => {
    if (!curve) return [];
    return Array.from({ length: divisions + 1 }, () => curve.getPointAt(0));
  });

  useFrame((state) => {
    if (!curve) return;
    const time = state.clock.getElapsedTime();
    // Cycle t from 0 to 1 + trailLength so it can fully disappear at the end
    const t = (time * speed + delay) % (1 + trailLength);
    
    const tail = Math.max(0, t - trailLength);
    const head = Math.min(1, t);
    
    const newPoints = [];
    for (let i = 0; i <= divisions; i++) {
      const sampleT = tail + (head - tail) * (i / divisions);
      newPoints.push(curve.getPointAt(sampleT));
    }
    setPulsePoints(newPoints);
  });

  if (!curve || !pulsePoints || pulsePoints.length === 0) return null;

  // Only render pulse if it has actual length to prevent static dots at start/end
  const isPulseActive = pulsePoints[0] && pulsePoints[divisions] && pulsePoints[0].distanceTo(pulsePoints[divisions]) > 0.05;

  return (
    <group>
      {/* Faint static base path */}
      {fullPoints && fullPoints.length >= 2 && (
        <Line
          points={fullPoints}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.18}
        />
      )}

      {/* Bright moving pulse segment */}
      {isPulseActive && pulsePoints.length >= 2 && (
        <Line
          points={pulsePoints}
          color={color}
          lineWidth={3.0}
          transparent
          opacity={0.9}
        />
      )}
    </group>
  );
};

const Earth = () => {
  const earthGroupRef = useRef();
  
  // Load the downloaded earth texture
  const colorMap = useTexture('/earth-texture.jpg');

  useFrame(() => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += 0.002;
    }
  });

  const signals = useMemo(() => {
    const connections = [
      // North America to Europe
      { start: [1.2, 1.8, 1.2], end: [-1.0, 1.8, -1.0], height: 1.5, speed: 0.5, delay: 0.0, color: '#00f2fe' },
      // North America to Asia
      { start: [1.2, 1.8, 1.2], end: [-1.8, 1.0, 1.2], height: 2.2, speed: 0.4, delay: 0.2, color: '#915eff' },
      // Europe to Asia
      { start: [-1.0, 1.8, -1.0], end: [-1.8, 1.0, 1.2], height: 1.8, speed: 0.6, delay: 0.4, color: '#00f2fe' },
      // Europe to Africa
      { start: [-1.0, 1.8, -1.0], end: [-0.5, 0.2, -2.2], height: 1.2, speed: 0.5, delay: 0.6, color: '#915eff' },
      // Asia to Australia
      { start: [-1.8, 1.0, 1.2], end: [-1.5, -1.5, 1.5], height: 1.6, speed: 0.4, delay: 0.1, color: '#00f2fe' },
      // North America to South America
      { start: [1.2, 1.8, 1.2], end: [1.0, -1.5, 1.5], height: 1.9, speed: 0.5, delay: 0.3, color: '#915eff' },
      // South America to Africa
      { start: [1.0, -1.5, 1.5], end: [-0.5, 0.2, -2.2], height: 2.1, speed: 0.4, delay: 0.5, color: '#00f2fe' },
      // Africa to Asia
      { start: [-0.5, 0.2, -2.2], end: [-1.8, 1.0, 1.2], height: 1.7, speed: 0.5, delay: 0.7, color: '#915eff' },
      // South America to Antarctica/South
      { start: [1.0, -1.5, 1.5], end: [0.0, -2.4, 0.5], height: 1.3, speed: 0.6, delay: 0.2, color: '#00f2fe' },
      // North America to Hawaii/Pacific
      { start: [1.2, 1.8, 1.2], end: [2.2, 0.5, 0.8], height: 1.5, speed: 0.4, delay: 0.4, color: '#915eff' },
      // Europe to South America
      { start: [-1.0, 1.8, -1.0], end: [1.0, -1.5, 1.5], height: 2.4, speed: 0.3, delay: 0.1, color: '#00f2fe' },
      // Australia to North America
      { start: [-1.5, -1.5, 1.5], end: [1.2, 1.8, 1.2], height: 2.6, speed: 0.35, delay: 0.5, color: '#915eff' }
    ];

    return connections.map((conn) => ({
      curve: createArc(
        new THREE.Vector3(...conn.start),
        new THREE.Vector3(...conn.end),
        conn.height
      ),
      speed: conn.speed,
      delay: conn.delay,
      color: conn.color
    }));
  }, []);

  return (
    <group ref={earthGroupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={2} color="#915eff" />
      <directionalLight position={[-5, -3, -5]} intensity={1.5} color="#00cec9" />
      
      {/* The Earth Mesh */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>

      {signals.map((sig, idx) => (
        <FlyingArc
          key={idx}
          curve={sig.curve}
          speed={sig.speed}
          delay={sig.delay}
          color={sig.color}
        />
      ))}
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
