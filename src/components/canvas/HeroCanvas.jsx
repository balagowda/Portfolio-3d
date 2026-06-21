import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Float, Sparkles, OrbitControls, Preload } from '@react-three/drei';
import CanvasLoader from './Loader';

const InteractiveText = ({ isMobile }) => {
  const textRef = useRef();
  const { viewport } = useThree();
  
  // Parallax effect based on mouse movement
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (textRef.current) {
      // Subtle float
      textRef.current.position.y = Math.sin(t * 1.5) * 0.1;
      // Mouse interaction
      const mouseX = (state.pointer.x * 0.5);
      const mouseY = (state.pointer.y * 0.5);
      textRef.current.rotation.y = mouseX * 0.2;
      textRef.current.rotation.x = -mouseY * 0.2;
    }
  });

  // Calculate size to prevent horizontal overflow.
  // "BALACHANDREGOWDA" has 17 characters.
  // To fit inside viewport.width, the font size should be at most viewport.width * 0.85 / 13.
  const maxBalaSize = (viewport.width * 0.85) / 13;
  const balaSize = isMobile ? Math.min(0.4, maxBalaSize) : Math.min(0.7, maxBalaSize);
  
  // "SOFTWARE ENGINEER" has 17 characters.
  const softwareSize = isMobile ? Math.min(0.2, maxBalaSize * 0.5) : Math.min(0.4, maxBalaSize * 0.5);

  return (
    <group ref={textRef}>
      <Center position={[0, isMobile ? 1.6 : 0.8, 0]}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={balaSize}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          BALACHANDREGOWDA
          <meshStandardMaterial
            color="#ffffff"
            emissive="#1aacb3"
            emissiveIntensity={0.40}
            roughness={0.1}
            metalness={0.8}
          />
        </Text3D>
      </Center>
      <Center position={[0, isMobile ? 0.6 : -0.1, 0]}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={softwareSize}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
        >
          SOFTWARE ENGINEER
          <meshStandardMaterial
            color="#9ca3af"
            emissive="#7028e4"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.5}
          />
        </Text3D>
      </Center>
    </group>
  );
};

const HeroCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f2fe" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#7028e4" />
        
        {/* Interactive 3D Text */}
        <InteractiveText isMobile={isMobile} />

        {/* Particles */}
        <Sparkles 
          count={isMobile ? 100 : 250} 
          scale={isMobile ? 6 : 12} 
          size={isMobile ? 2 : 4} 
          speed={0.4} 
          color="#00f2fe" 
        />
        <Sparkles 
          count={isMobile ? 50 : 100} 
          scale={isMobile ? 8 : 15} 
          size={isMobile ? 3 : 6} 
          speed={0.2} 
          color="#7028e4" 
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxAzimuthAngle={0.3}
          minAzimuthAngle={-0.3}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default HeroCanvas;
