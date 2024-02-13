import { FC } from 'react'
import { Center, Stage, useGLTF } from '@react-three/drei'
import { Mesh } from 'three'

import suzi from '../../assets/suzi.glb'

export interface SuziProps {
  onClick?: () => void
  color: string
}

export const Suzi: FC<SuziProps> = ({ onClick, color }) => {
  const { nodes } = useGLTF(suzi)
  const geometry = (nodes['mesh'] as Mesh).geometry

  return (
    <Center top position={[0, 0.1, 0]}>
      <Stage
        adjustCamera={2}
        intensity={0.5}
        shadows={{ type: 'contact', offset: 0.1 }}
        environment={'city'}
      >
        <mesh
          receiveShadow
          castShadow
          rotation={[-0.63, 0, 0]}
          onClick={onClick}
          geometry={geometry}
        >
          <meshStandardMaterial color={color} />
        </mesh>
      </Stage>
    </Center>
  )
}
