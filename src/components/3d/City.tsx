'use client';

import { usePlane } from '@react-three/cannon';
import * as THREE from 'three';
import { ServiceZone } from './ServiceZone';

export function City({ carPositionRef, onZoneEnter, onZoneExit }: { carPositionRef: React.MutableRefObject<[number, number, number]>, onZoneEnter: (data: any) => void, onZoneExit: () => void }) {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    type: 'Static',
    material: 'ground'
  }));

  const zones = [
    {
      id: 'car-financing',
      position: [15, 0, -15] as [number, number, number],
      color: '#F7941D',
      title: 'Auto Financing',
      description: 'Get your dream car with flexible payment plans.',
      link: '/individuals/car-financing'
    },
    {
      id: 'personal-financing',
      position: [-15, 0, -15] as [number, number, number],
      color: '#22D3EE',
      title: 'Personal Finance',
      description: 'Customized solutions for your personal needs.',
      link: '/individuals/personal-financing'
    },
    {
      id: 'business-financing',
      position: [0, 0, -30] as [number, number, number],
      color: '#8B5CF6',
      title: 'Business Finance',
      description: 'Grow your business with our integrated solutions.',
      link: '/business/cash-financing'
    },
  ];

  return (
    <group>
      {/* Ground */}
      <mesh ref={ref as React.Ref<THREE.Mesh>} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#111" />
        <gridHelper args={[200, 50, '#333', '#222']} rotation={[-Math.PI/2, 0, 0]} position={[0, 0.1, 0]} />
      </mesh>

      {/* Zones */}
      {zones.map((zone) => (
        <ServiceZone
          key={zone.id}
          {...zone}
          carPositionRef={carPositionRef}
          onEnter={() => onZoneEnter(zone)}
          onLeave={onZoneExit}
        />
      ))}
      
      {/* Decorative road markings or obstacles can go here */}
      <mesh position={[0, 1, 10]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}
