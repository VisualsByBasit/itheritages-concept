"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The mark assembling in 3D: four extruded quadrant tiles that fly in from
 * different depths and angles, settle into the pinwheel, and level off
 * face-on as the sequence ends.
 *
 * The four-quadrant reading of the logo is the same abstraction
 * `three/heritage-object.tsx` already uses — same colours, same tile size,
 * same ±1.05 spacing — so the boot mark and the About page's object are
 * recognisably the same object. The real logo carries a diagonal split and a
 * grey "IT" chip that neither reproduces; the flat lockup shown on the reduced
 * motion path is the faithful one.
 */

const SIZE: [number, number, number] = [1.9, 1.9, 0.36];

/** Where each tile starts, and the rotation it unwinds on the way in. */
const TILES = [
  {
    color: "#86c60c",
    to: [-1.05, 1.05, 0.55],
    from: [-5.6, 3.5, -4.2],
    spin: [0.9, -1.5, 0.5],
  },
  {
    color: "#079dfb",
    to: [1.05, 1.05, 0.28],
    from: [5.3, 4.1, 3.4],
    spin: [-1.2, 1.3, -0.6],
  },
  {
    color: "#026430",
    to: [-1.05, -1.05, 0.4],
    from: [-5.1, -3.9, 3.8],
    spin: [1.3, 0.9, 1.2],
  },
  {
    color: "#5333aa",
    to: [1.05, -1.05, 0.16],
    from: [5.7, -3.3, -3.6],
    spin: [-0.8, -1.4, -1.3],
  },
] as const;

/** Seconds between each tile launching. */
const STAGGER = 0.1;
const TILE_DURATION = 0.72;
/** How long the whole group takes to level off face-on. */
const SETTLE_DURATION = 1.2;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

function AssemblingMark() {
  const groupRef = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    // Anchor to the first rendered frame rather than clock zero, so a slow
    // canvas mount doesn't eat part of the animation.
    if (start.current === null) start.current = clock.getElapsedTime();
    const time = clock.getElapsedTime() - start.current;

    group.children.forEach((child, index) => {
      const tile = TILES[index];
      const progress = easeOutCubic(
        clamp01((time - index * STAGGER) / TILE_DURATION)
      );

      child.position.set(
        THREE.MathUtils.lerp(tile.from[0], tile.to[0], progress),
        THREE.MathUtils.lerp(tile.from[1], tile.to[1], progress),
        THREE.MathUtils.lerp(tile.from[2], tile.to[2], progress)
      );
      child.rotation.set(
        tile.spin[0] * (1 - progress),
        tile.spin[1] * (1 - progress),
        tile.spin[2] * (1 - progress)
      );
      const scale = 0.45 + 0.55 * progress;
      child.scale.setScalar(scale);

      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.opacity = progress;
    });

    // The whole mark turns to face the viewer as the tiles land.
    const settle = easeOutCubic(clamp01(time / SETTLE_DURATION));
    group.rotation.y = THREE.MathUtils.lerp(0.85, 0, settle);
    group.rotation.x = THREE.MathUtils.lerp(-0.5, 0, settle);
    group.rotation.z = THREE.MathUtils.lerp(0.16, 0, settle);
  });

  return (
    <group ref={groupRef}>
      {TILES.map((tile, index) => (
        <mesh key={index}>
          <boxGeometry args={SIZE} />
          <meshStandardMaterial
            color={tile.color}
            roughness={0.42}
            metalness={0.06}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

export function BootMark() {
  return (
    <Canvas
      className="absolute! inset-0"
      camera={{ position: [0, 0, 8.4], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 6, 6]} intensity={2.1} />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#cfe8ff" />
      <AssemblingMark />
    </Canvas>
  );
}
