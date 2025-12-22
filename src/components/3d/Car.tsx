'use client';

import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function Wheel({ radius = 0.7, leftSide, ...props }: any) {
  const { ref } = props;
  return (
    <mesh ref={ref}>
      <boxGeometry args={[radius, radius, 0.25]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  );
}

export function Car({ position, positionRef }: { position: [number, number, number], positionRef: React.MutableRefObject<[number, number, number]> }) {
  const { camera } = useThree();
  const chassisWidth = 1.5;
  const chassisHeight = 1;
  const chassisLength = 3;
  const mass = 150;

  const [chassisBody, chassisApi] = useBox(() => ({
    allowSleep: false,
    args: [chassisWidth, chassisHeight, chassisLength],
    mass,
    position,
  }));

  const [wheels, wheelInfos] = useState<any[]>([]);

  const wheelRef1 = useRef<THREE.Object3D>(null);
  const wheelRef2 = useRef<THREE.Object3D>(null);
  const wheelRef3 = useRef<THREE.Object3D>(null);
  const wheelRef4 = useRef<THREE.Object3D>(null);

  const vehicle = useRaycastVehicle(() => ({
    chassisBody,
    wheelInfos,
    wheels: [wheelRef1, wheelRef2, wheelRef3, wheelRef4],
  }));

  const vehicleApi = vehicle[1];

  // Initialize wheels
  useEffect(() => {
   const wheelInfo = {
      radius: 0.5,
      directionLocal: [0, -1, 0],
      suspensionStiffness: 30,
      suspensionRestLength: 0.3,
      maxSuspensionForce: 100000,
      maxSuspensionTravel: 0.3,
      dampingRelaxation: 2.3,
      dampingCompression: 4.4,
      axleLocal: [-1, 0, 0],
      chassisConnectionPointLocal: [1, 0, 1],
      useCustomSlidingRotationalSpeed: true,
      customSlidingRotationalSpeed: -30,
      frictionSlip: 2,
    };

    const wheelInfosFixed = [
      { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [-chassisWidth / 2 + 0.3, -chassisHeight / 2, chassisLength / 2 - 0.6] },
      { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [chassisWidth / 2 - 0.3, -chassisHeight / 2, chassisLength / 2 - 0.6] },
      { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [-chassisWidth / 2 + 0.3, -chassisHeight / 2, -chassisLength / 2 + 0.6] },
      { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [chassisWidth / 2 - 0.3, -chassisHeight / 2, -chassisLength / 2 + 0.6] },
    ];
  
    // Re-initialize vehicle with correct infos (trick to get wheels working)
    // In a real app we might just set this initial state, but useRaycastVehicle is sensitive to order
    // @ts-ignore
    wheelInfos.current = wheelInfosFixed;
    // Force update not needed if we mutate the ref that useRaycastVehicle reads from or if we passed it initially correctly.
    // Ideally we'd just pass wheelInfosFixed to the hook initially.
  }, []);

  const controls = useControls();

  useFrame((state) => {
    const { forward, backward, left, right, brake, reset } = controls.current;

    const force = 1500;
    const maxBrake = 50;
    const steer = 0.5;

    // Get current position
    const currentPos = new THREE.Vector3();
    // @ts-ignore
    currentPos.setFromMatrixPosition(chassisBody.current.matrixWorld);
    
    // Update the ref for other components to read
    if (positionRef) {
        positionRef.current = [currentPos.x, currentPos.y, currentPos.z];
    }
    
    // Camera follow logic
    const cameraOffset = new THREE.Vector3(0, 10, 15);
    // Ideally we rotate the offset based on car rotation, but fixed offset is easier for "top downish" view
    // Let's make it follow smoothly
    
    // Simple follow
    camera.position.lerp(new THREE.Vector3(currentPos.x + 0, currentPos.y + 10, currentPos.z + 15), 0.1);
    camera.lookAt(currentPos);

    if (currentPos.y < -10 || reset) {
      chassisApi.position.set(0, 2, 0);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }

    // Engine force
    const engineForce = (forward ? -force : 0) + (backward ? force : 0);
    vehicleApi.applyEngineForce(engineForce, 2);
    vehicleApi.applyEngineForce(engineForce, 3);

    // Steering
    const steeringValue = (left ? steer : 0) + (right ? -steer : 0);
    vehicleApi.setSteeringValue(steeringValue, 0);
    vehicleApi.setSteeringValue(steeringValue, 1);

    // Brake
    const brakeForce = brake ? maxBrake : 0;
    vehicleApi.setBrake(brakeForce, 0);
    vehicleApi.setBrake(brakeForce, 1);
    vehicleApi.setBrake(brakeForce, 2);
    vehicleApi.setBrake(brakeForce, 3);
  });

  return (
    <group>
      <mesh ref={chassisBody}>
        <boxGeometry args={[chassisWidth, chassisHeight, chassisLength]} />
        <meshStandardMaterial color="#00377B" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Wheels visualization */}
      <Wheel ref={wheelRef1} radius={0.5} leftSide />
      <Wheel ref={wheelRef2} radius={0.5} />
      <Wheel ref={wheelRef3} radius={0.5} leftSide />
      <Wheel ref={wheelRef4} radius={0.5} />
    </group>
  );
}

function useControls() {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
    reset: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setControls((c) => ({ ...c, forward: true }));
          break;
        case 's':
        case 'arrowdown':
          setControls((c) => ({ ...c, backward: true }));
          break;
        case 'a':
        case 'arrowleft':
          setControls((c) => ({ ...c, left: true }));
          break;
        case 'd':
        case 'arrowright':
          setControls((c) => ({ ...c, right: true }));
          break;
        case ' ':
          setControls((c) => ({ ...c, brake: true }));
          break;
        case 'r':
          setControls((c) => ({ ...c, reset: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setControls((c) => ({ ...c, forward: false }));
          break;
        case 's':
        case 'arrowdown':
          setControls((c) => ({ ...c, backward: false }));
          break;
        case 'a':
        case 'arrowleft':
          setControls((c) => ({ ...c, left: false }));
          break;
        case 'd':
        case 'arrowright':
          setControls((c) => ({ ...c, right: false }));
          break;
        case ' ':
          setControls((c) => ({ ...c, brake: false }));
          break;
        case 'r':
          setControls((c) => ({ ...c, reset: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { current: controls };
}
