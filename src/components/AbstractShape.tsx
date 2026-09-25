"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function Shape() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Fare hareketine göre çok hafif dönüş (interaktiflik)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 4]} />
        <MeshDistortMaterial
          color="#060607" // void
          emissive="#111113"
          roughness={0.2}
          metalness={0.8}
          distort={0.4} // Yüzey bozulma efekti
          speed={2} // Bozulma animasyon hızı
        />
        
        {/* İçte parlayan wireframe kafes */}
        <mesh scale={1.01}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#FF3B00" wireframe transparent opacity={0.15} />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function AbstractShape() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-80 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#FF3B00" />
        <Shape />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
