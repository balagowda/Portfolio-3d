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
  const duration = 1.0; // Time to draw the line
  const pause = 0.4;    // Time it stays visible and fades out
  const cycleTime = duration + pause; // Total cycle duration
  
  const [pulsePoints, setPulsePoints] = useState(() => {
    if (!curve) return [];
    return Array.from({ length: divisions + 1 }, () => curve.getPointAt(0));
  });

  const [opacity, setOpacity] = useState(0.8);

  useFrame((state) => {
    if (!curve) return;
    const time = state.clock.getElapsedTime();
    const cycle = (time * speed + delay) % cycleTime;
    
    // progress goes from 0 to 1 during the drawing phase
    const progress = Math.min(1.0, cycle / duration);
    
    const tail = 0;
    const head = progress;
    
    const newPoints = [];
    for (let i = 0; i <= divisions; i++) {
      const sampleT = tail + (head - tail) * (i / divisions);
      newPoints.push(curve.getPointAt(sampleT));
    }
    setPulsePoints(newPoints);

    // Calculate opacity: 0.8 during drawing, then fade to 0 during pause
    let newOpacity = 0.8;
    if (cycle > duration) {
      const fadeProgress = (cycle - duration) / pause;
      newOpacity = 0.8 * (1 - fadeProgress);
    }
    setOpacity(newOpacity);
  });

  if (!curve || !pulsePoints || pulsePoints.length === 0) return null;

  // Only render if the line has actual length to prevent static dots at start/end
  const isPulseActive = pulsePoints[0] && pulsePoints[divisions] && pulsePoints[0].distanceTo(pulsePoints[divisions]) > 0.05;

  return (
    <group>
      {/* Animated flying pulse segment as a solid line */}
      {isPulseActive && pulsePoints.length >= 2 && (
        <Line
          points={pulsePoints}
          color={color}
          lineWidth={2.5}
          transparent
          opacity={opacity}
        />
      )}
    </group>
  );
};

const Earth = () => {
  const earthGroupRef = useRef();
  
  // Load the downloaded earth texture
  const colorMap = useTexture(`${import.meta.env.BASE_URL}earth-texture.jpg`);

  useFrame(() => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += 0.002;
    }
  });

  const signals = useMemo(() => {
    const points = [];
    const numPoints = 12; // Reduced endpoints for 6 distributed connections
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    // Generate 12 evenly distributed points on the unit sphere
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push(new THREE.Vector3(x, y, z));
    }

    const connections = [];
    for (let i = 0; i < 6; i++) {
      const start = points[i];
      // Offset by 5 to connect distant points across the globe
      const end = points[(i + 5) % numPoints];
      
      const height = 1.2 + (i % 3) * 0.4;      // Alternate heights: 1.2, 1.6, 2.0
      const speed = 0.35 + (i % 4) * 0.08;     // Alternate speeds
      const delay = (i * 0.25) % 1.4;          // Alternate delays
      const color = i % 2 === 0 ? '#00f2fe' : '#915eff'; // Alternate colors

      connections.push({
        curve: createArc(start, end, height),
        speed,
        delay,
        color
      });
    }
    return connections;
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
