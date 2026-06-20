import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Preload } from '@react-three/drei';

function RotatingStars() {
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta * 0.02;
    ref.current.rotation.y -= delta * 0.03;
  });

  return (
    <group ref={ref}>
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1.5}
      />
    </group>
  );
}

export default function StarBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <RotatingStars />
        <Preload all />
      </Canvas>
    </div>
  );
}
