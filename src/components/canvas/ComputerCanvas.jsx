import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, Float } from '@react-three/drei';
import CanvasLoader from './Loader';

const TechCore = ({ isMobile }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh
        ref={meshRef}
        scale={isMobile ? 1.5 : 2.5}
        position={isMobile ? [0, -1, 0] : [0, -0.5, 0]}
      >
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        <meshStandardMaterial
          color="#915eff"
          emissive="#6c63ff"
          emissiveIntensity={0.5}
          wireframe={true}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Inner glowing core */}
      <mesh scale={isMobile ? 1.2 : 2.0} position={isMobile ? [0, -1, 0] : [0, -0.5, 0]}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#00cec9"
          emissive="#00cec9"
          emissiveIntensity={1}
          wireframe={false}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <TechCore isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
