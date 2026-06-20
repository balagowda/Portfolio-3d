import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useTexture } from '@react-three/drei';
import CanvasLoader from './Loader';

const Earth = () => {
  const earthRef = useRef();
  
  // Load the downloaded earth texture
  const colorMap = useTexture('/earth-texture.jpg');

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={earthRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={2} color="#915eff" />
      <directionalLight position={[-5, -3, -5]} intensity={1.5} color="#00cec9" />
      
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
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
