'use client';

import { useBox } from '@react-three/cannon';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface ServiceZoneProps {
  position: [number, number, number];
  color: string;
  title: string;
  description: string;
  link: string;
  carPositionRef: React.MutableRefObject<[number, number, number]>;
  onEnter?: () => void;
  onLeave?: () => void;
}

export function ServiceZone({ position, color, title, description, link, carPositionRef, onEnter, onLeave }: ServiceZoneProps) {
  const [active, setActive] = useState(false);
  const triggerDist = 6;
  
  useFrame(() => {
    if (!carPositionRef.current) return;
    
    const dist = new THREE.Vector3(...position).distanceTo(new THREE.Vector3(...carPositionRef.current));
    const isActive = dist < triggerDist;
    
    if (isActive && !active) {
      setActive(true);
      onEnter?.();
    } else if (!isActive && active) {
      setActive(false);
      onLeave?.();
    }
  });

  return (
    <group position={position}>
      {/* Visual Marker */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[4, 4, 0.2, 32]} />
        <meshStandardMaterial color={active ? '#fff' : color} transparent opacity={0.6} />
      </mesh>
      
      {/* Floating text/icon */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* 3D Text Label */}
       <Html position={[0, 4, 0]} center distanceFactor={10}>
          <div className="bg-black/50 text-white px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap pointer-events-none select-none">
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
       </Html>
    </group>
  );
}
