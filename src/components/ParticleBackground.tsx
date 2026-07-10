import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 800 }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20

      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        col[i * 3] = 0.15
        col[i * 3 + 1] = 0.39
        col[i * 3 + 2] = 0.92
      } else if (colorChoice < 0.7) {
        col[i * 3] = 0.02
        col[i * 3 + 1] = 0.71
        col[i * 3 + 2] = 0.83
      } else {
        col[i * 3] = 0.66
        col[i * 3 + 1] = 0.33
        col[i * 3 + 2] = 0.97
      }
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={group}>
      <mesh position={[3, 1, -2]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[-3, -1, -3]} rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh position={[2, -2, -1]}>
        <torusGeometry args={[0.3, 0.1, 8, 16]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <Particles />
          <FloatingShapes />
        </Canvas>
      </Suspense>
    </div>
  )
}
