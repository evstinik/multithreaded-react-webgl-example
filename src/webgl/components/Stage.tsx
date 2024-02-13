import { FC, PropsWithChildren, Suspense } from 'react'
import { Grid, OrbitControls } from '@react-three/drei'

export const Stage: FC<PropsWithChildren> = ({ children }) => (
  <group>
    <Suspense>{children}</Suspense>

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
