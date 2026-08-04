"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * A 3D reading of the IT Heritages mark: four quadrant tiles lifted off a
 * shared plane and slowly rotating, so the logo's pinwheel resolves and
 * dissolves as it turns.
 *
 * Tuned for the light palette — flat brand colours, a soft key light and no
 * bloom, so it reads as a crafted object rather than a neon render.
 */

const TILES = [
  { position: [-1.05, 1.05, 0], size: [1.9, 1.9, 0.36], color: "#86c60c", lift: 0.55 },
  { position: [1.05, 1.05, 0], size: [1.9, 1.9, 0.36], color: "#079dfb", lift: 0.28 },
  { position: [-1.05, -1.05, 0], size: [1.9, 1.9, 0.36], color: "#026430", lift: 0.4 },
  { position: [1.05, -1.05, 0], size: [1.9, 1.9, 0.36], color: "#5333aa", lift: 0.16 },
] as const;

function Mark({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const timer = useRef(new THREE.Timer());

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    if (reducedMotion) {
      group.rotation.set(-0.34, 0.62, 0);
      return;
    }

    timer.current.update();
    const t = timer.current.getElapsed();

    // Slow, continuous turn with a gentle nod — never a full spin.
    group.rotation.y = 0.62 + Math.sin(t * 0.22) * 0.55;
    group.rotation.x = -0.34 + Math.sin(t * 0.16) * 0.12;

    group.children.forEach((child, index) => {
      child.position.z = TILES[index].lift + Math.sin(t * 0.5 + index * 1.3) * 0.14;
    });
  });

  return (
    <group ref={groupRef} rotation={[-0.34, 0.62, 0]}>
      {TILES.map((tile, index) => (
        <mesh key={index} position={[tile.position[0], tile.position[1], tile.lift]}>
          <boxGeometry args={tile.size} />
          <meshStandardMaterial
            color={tile.color}
            roughness={0.42}
            metalness={0.06}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeritageObject() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      className="absolute! inset-0"
      camera={{ position: [0, 0, 8.4], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 6, 6]} intensity={2.1} />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#cfe8ff" />
      <Mark reducedMotion={reducedMotion} />
    </Canvas>
  );
}
