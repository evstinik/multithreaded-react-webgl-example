import { FC } from 'react'
import { Center, Text3D } from '@react-three/drei'

export const Label: FC<{ children: string }> = ({ children }) => {
  return (
    <Center position={[0, 0, 1.05]} cacheKey={children}>
      <Text3D font='/inter_bold.json' rotation={[-Math.PI * 0.5, 0, 0]} size={0.5} height={0.05}>
        <meshStandardMaterial color='white' />
        {children}
      </Text3D>
    </Center>
  )
}
