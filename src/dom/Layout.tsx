import { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren<{}>) => (
  <div className='w-screen h-screen flex flex-row'>{children}</div>
)
