"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  MeshDistortMaterial,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

function SmartAppliance() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.4;
    if (ring2.current) ring2.current.rotation.x += delta * -0.3;
  });

  return (
    <group ref={group}>
      {/* Body */}
      <RoundedBox args={[1.6, 2.6, 1.3]} radius={0.08} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#aab4bd" metalness={0.75} roughness={0.32} />
      </RoundedBox>

      {/* Door seam */}
      <mesh position={[0, 0, 0.66]}>
        <planeGeometry args={[1.55, 2.55]} />
        <meshStandardMaterial color="#c2cad1" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Glowing smart display panel */}
      <mesh position={[0, 0.55, 0.675]}>
        <planeGeometry args={[0.85, 0.55]} />
        <meshStandardMaterial
          color="#3fd0c9"
          emissive="#3fd0c9"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0.72, 0, 0.5]}>
        <capsuleGeometry args={[0.035, 1.6, 4, 8]} />
        <meshStandardMaterial color="#f1f4f6" metalness={0.85} roughness={0.1} />
      </mesh>

      {/* Orbiting data rings */}
      <mesh ref={ring1} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.9, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#3fd0c9"
          emissive="#3fd0c9"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[2.3, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#8a8fff"
          emissive="#8a8fff"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>

      {/* Floating accent orb */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[1.7, 1.4, 0.6]} scale={0.18}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#ff7849"
            speed={2}
            distort={0.35}
            emissive="#ff7849"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [3.2, 1.4, 4.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 6, 5]} angle={0.35} penumbra={0.6} intensity={1.8} castShadow />
          <pointLight position={[-4, -2, -3]} color="#3fd0c9" intensity={1.4} />
          <pointLight position={[3, -3, 4]} color="#8a8fff" intensity={0.8} />
          <hemisphereLight args={["#cfe8e6", "#0a0d11", 0.6]} />
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
            <SmartAppliance />
          </Float>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.55} scale={10} blur={2.4} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
