import { memo, PropsWithChildren } from 'react'
import { StyledMain } from './PageLayout.styles'
import Sidebar from '../../components/Sidebar/Sidebar'

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <StyledMain>{children}</StyledMain>
    </>
  )
}

export default memo(PageLayout)
