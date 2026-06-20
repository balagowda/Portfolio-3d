import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ geometry, position, color, speed = 1, rotationSpeed = 0.3, distort = 0.3, scale = 1 }) {
  const meshRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
    meshRef.current.position.x = position[0] + Math.sin(t * speed * 0.5 + offset) * 0.15;
    meshRef.current.rotation.x += rotationSpeed * 0.005;
    meshRef.current.rotation.y += rotationSpeed * 0.008;
    meshRef.current.rotation.z += rotationSpeed * 0.003;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.35}
        wireframe
        distort={distort}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function GlassShape({ geometry, position, color, speed = 1, rotationSpeed = 0.3, scale = 1 }) {
  const meshRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.35;
    meshRef.current.position.x = position[0] + Math.cos(t * speed * 0.4 + offset) * 0.1;
    meshRef.current.rotation.x += rotationSpeed * 0.004;
    meshRef.current.rotation.y += rotationSpeed * 0.007;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.18}
        roughness={0.1}
        metalness={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#915eff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00cec9" />
      <directionalLight position={[0, 5, 5]} intensity={0.3} color="#ff6b9d" />

      {/* Top-right: Torus */}
      <FloatingShape
        geometry={<torusGeometry args={[1, 0.4, 16, 50]} />}
        position={[3.5, 1.8, -2]}
        color="#915eff"
        speed={0.8}
        rotationSpeed={0.4}
        distort={0.25}
        scale={0.7}
      />

      {/* Left-center: Icosahedron */}
      <FloatingShape
        geometry={<icosahedronGeometry args={[1, 1]} />}
        position={[-3.8, -0.5, -1.5]}
        color="#00cec9"
        speed={1.1}
        rotationSpeed={0.35}
        distort={0.4}
        scale={0.85}
      />

      {/* Bottom-right: Octahedron */}
      <GlassShape
        geometry={<octahedronGeometry args={[1, 0]} />}
        position={[4, -2.2, -3]}
        color="#ff6b9d"
        speed={0.9}
        rotationSpeed={0.5}
        scale={0.9}
      />

      {/* Top-left: TorusKnot */}
      <FloatingShape
        geometry={<torusKnotGeometry args={[0.8, 0.25, 100, 16]} />}
        position={[-4.2, 2.5, -4]}
        color="#915eff"
        speed={0.7}
        rotationSpeed={0.25}
        distort={0.2}
        scale={0.55}
      />
    </>
  );
}

export default function FloatingShapes() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
        <Preload all />
      </Canvas>
    </div>
  );
}
