import { OrbitControls, Stage, Grid, Center, useGLTF } from '@react-three/drei'
import { FC, Suspense } from 'react'
import { MeshProps } from '@react-three/fiber'
import { Mesh } from 'three'

import suzi from './assets/suzi.glb'

const Scene = () => {
  return (
    <>
      <Center top position={[0, 0.1, 0]}>
        <Stage
          adjustCamera={2}
          intensity={0.5}
          shadows={{ type: 'contact', offset: 0.1 }}
          environment={'city'}
        >
          <Suspense>
            <Suzi receiveShadow castShadow rotation={[-0.63, 0, 0]} />
          </Suspense>
        </Stage>
      </Center>

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
    </>
  )
}

const Suzi: FC<MeshProps> = (props) => {
  const { nodes } = useGLTF(suzi)
  const geometry = (nodes['mesh'] as Mesh).geometry

  return (
    <mesh {...props} geometry={geometry}>
      <meshStandardMaterial color='orange' />
    </mesh>
  )
}

export default Scene
