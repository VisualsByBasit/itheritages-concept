"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 260;
const CONNECT_DISTANCE = 2.4;
const FIELD_RADIUS = 7;
const PRIMARY_COLOR = "#079dfb";
const SECONDARY_COLOR = "#86c60c";

function generateNodePositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.55;
  }
  return positions;
}

function buildEdgePositions(positions: Float32Array, maxDistance: number) {
  const count = positions.length / 3;
  const edges: number[] = [];

  for (let i = 0; i < count; i++) {
    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];

    for (let j = i + 1; j < count; j++) {
      const bx = positions[j * 3];
      const by = positions[j * 3 + 1];
      const bz = positions[j * 3 + 2];
      const dx = ax - bx;
      const dy = ay - by;
      const dz = az - bz;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance < maxDistance) {
        edges.push(ax, ay, az, bx, by, bz);
      }
    }
  }

  return new Float32Array(edges);
}

function Network({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const timer = useRef(new THREE.Timer());

  const nodePositions = useMemo(() => generateNodePositions(NODE_COUNT, FIELD_RADIUS), []);
  const edgePositions = useMemo(
    () => buildEdgePositions(nodePositions, CONNECT_DISTANCE),
    [nodePositions]
  );

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    timer.current.update();
    const delta = timer.current.getDelta();

    if (reducedMotion) {
      group.rotation.set(0, 0, 0);
      return;
    }

    group.rotation.y += delta * 0.02;

    const targetX = pointer.current.y * 0.1;
    const targetZ = pointer.current.x * -0.15;
    group.rotation.x += (targetX - group.rotation.x) * 0.03;
    group.rotation.z += (targetZ - group.rotation.z) * 0.03;

    const t = timer.current.getElapsed();
    state.camera.position.x = Math.sin(t * 0.08) * 0.6;
    state.camera.position.y = Math.cos(t * 0.06) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={PRIMARY_COLOR} transparent opacity={0.12} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={PRIMARY_COLOR}
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
      <points position={[0, 0, 0]} rotation={[0.3, 0.6, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions.slice(0, Math.floor(nodePositions.length * 0.15)), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={SECONDARY_COLOR}
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.5}
        />
      </points>
    </group>
  );
}

export function ParticleNetwork({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <Network reducedMotion={reducedMotion} />
    </Canvas>
  );
}
