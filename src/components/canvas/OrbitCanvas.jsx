import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, Float, Sparkles, Html, Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from './Loader';

// Tech data for planets
const planetsData = [
  { name: 'Java', icon: '/tech/java.svg', distance: 0, speed: 0, size: 1.5, color: '#f97316' }, // Center Sun
  { name: 'Spring', icon: '/tech/spring.svg', distance: 2.5, speed: 0.8, size: 0.8, color: '#10b981' },
  { name: 'AWS', icon: '/tech/aws.svg', distance: 4.0, speed: 0.5, size: 0.7, color: '#f59e0b' },
  { name: 'Docker', icon: '/tech/docker.svg', distance: 5.5, speed: 0.3, size: 0.8, color: '#3b82f6' },
  { name: 'MySQL', icon: '/tech/mysql.svg', distance: 7.0, speed: 0.2, size: 0.6, color: '#0ea5e9' },
  { name: 'React', icon: '/tech/react.svg', distance: 8.5, speed: 0.15, size: 0.6, color: '#61dafb' },
  { name: 'Git', icon: '/tech/git.svg', distance: 10.0, speed: 0.1, size: 0.5, color: '#f43f5e' },
];

const Planet = ({ data }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(data.icon);
  
  // Random starting angle for the orbit
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    // Rotate the planet itself
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
    // Orbit around the center
    if (groupRef.current && data.distance > 0) {
      groupRef.current.rotation.y += delta * data.speed;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, randomOffset, 0]}>
      <group position={[data.distance, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? 1.2 : 1}
          >
            <sphereGeometry args={[data.size, 32, 32]} />
            <meshStandardMaterial
              color={hovered ? data.color : '#aaaaaa'}
              emissive={hovered ? data.color : '#000000'}
              emissiveIntensity={0.2}
              roughness={0.2}
              metalness={0.8}
            />
            <Decal
              position={[0, 0, data.size]}
              rotation={[0, 0, 0]}
              scale={data.size * 1.5}
              map={texture}
              flatShading
            />
          </mesh>
          
          {/* HTML label that shows on hover */}
          {hovered && (
            <Html distanceFactor={15} center>
              <div style={{
                background: 'rgba(5, 5, 5, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '4px 10px',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                border: `1px solid ${data.color}`,
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}>
                {data.name}
              </div>
            </Html>
          )}
        </Float>

        {/* Orbit Ring (only for planets, not the sun) */}
        {data.distance > 0 && (
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[-data.distance, 0, 0]}>
            <ringGeometry args={[data.distance - 0.02, data.distance + 0.02, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </group>
  );
};

const OrbitGroup = () => {
  const { viewport } = useThree();
  
  // The outermost planet is Git at distance 10.0 + size 0.5 = 10.5.
  // The base diameter of the entire orbit system is 21.0 units.
  const systemDiameter = 21.0;
  
  // Fit 90% of viewport width
  const scaleWidth = (viewport.width * 0.9) / systemDiameter;
  
  // Fit 75% of viewport height (accounting for vertical foreshortening from 8/16 camera tilt)
  const cosTilt = 16 / Math.sqrt(64 + 256);
  const scaleHeight = (viewport.height * 0.75) / (systemDiameter * cosTilt);
  
  // Use the smaller scale to guarantee it fits both width and height constraints
  const groupScale = Math.min(scaleWidth, scaleHeight);

  return (
    <group scale={groupScale}>
      {planetsData.map((planet, idx) => (
        <Planet key={idx} data={planet} />
      ))}
    </group>
  );
};

const OrbitCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 8, 16], fov: 45 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f2fe" />
        
        <OrbitGroup />

        {/* Background stars */}
        <Sparkles count={300} scale={20} size={2} speed={0.2} color="#7028e4" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default OrbitCanvas;
