'use client';

import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import { useState, useRef } from 'react';
import { Car } from './Car';
import { City } from './City';
import { Overlay } from './Overlay';

export default function Experience() {
  // Use a ref for high-frequency updates to avoid re-renders
  const carPositionRef = useRef<[number, number, number]>([0, 2, 0]);
  const [activeZone, setActiveZone] = useState<any>(null);

  return (
    <div className="w-full h-screen bg-[#050505]">
      <Overlay activeZone={activeZone} />
      
      <Canvas shadows camera={{ position: [0, 10, 15], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 50]} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} castShadow />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Physics gravity={[0, -9.81, 0]}>
          <City 
            carPositionRef={carPositionRef} 
            onZoneEnter={setActiveZone} 
            onZoneExit={() => setActiveZone(null)} 
          />
          <Car position={[0, 2, 0]} positionRef={carPositionRef} />
        </Physics>
        
        {/* Environment reflection */}
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
