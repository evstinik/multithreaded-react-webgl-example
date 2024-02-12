import { OrbitControls, Stage, Grid, Center, useGLTF, Text3D } from '@react-three/drei'
import { FC, Suspense } from 'react'
import { MeshProps } from '@react-three/fiber'
import { Mesh } from 'three'
import { store } from './store'
import { useSnapshot } from 'valtio'

import suzi from './assets/suzi.glb'

const invertColor = () => {
  store.color = `#${Number(0xffffff - Number.parseInt(store.color.slice(1), 16))
    .toString(16)
    .padStart(6, '0')}`
  store.name = `Inverted ${store.name}`
}

const Scene = () => {
  const snap = useSnapshot(store)

  return (
    <group>
      <Center top position={[0, 0.1, 0]}>
        <Stage
          adjustCamera={2}
          intensity={0.5}
          shadows={{ type: 'contact', offset: 0.1 }}
          environment={'city'}
        >
          <Suspense>
            <Suzi
              receiveShadow
              castShadow
              rotation={[-0.63, 0, 0]}
              color={snap.color}
              onClick={invertColor}
            />
          </Suspense>
        </Stage>
      </Center>

      <Suspense>
        <Center position={[0, 0, 1.05]} cacheKey={snap.name}>
          <Text3D
            font='/inter_bold.json'
            rotation={[-Math.PI * 0.5, 0, 0]}
            size={0.5}
            height={0.05}
          >
            <meshStandardMaterial color='white' />
            {snap.name}
          </Text3D>
        </Center>
      </Suspense>

      <Grid
        position={[0, -0.01, 0]}
        args={[10.5, 10.5]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor={'#6f6f6f'}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={'#9d4b4b'}
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />

      <OrbitControls makeDefault enableDamping={false} />
    </group>
  )
}

const Suzi: FC<MeshProps & { color: string }> = (props) => {
  const { nodes } = useGLTF(suzi)
  const geometry = (nodes['mesh'] as Mesh).geometry

  return (
    <mesh {...props} geometry={geometry}>
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}

export default Scene
