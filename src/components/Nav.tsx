'use client'
import styled from 'styled-components'

import { ModelSelector } from './ui/ModelSelector'

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 4rem;
  z-index: 50;
`


export const Nav = ({ children }: { children }) => {
  return (
    <HeaderContainer>
      <ModelSelector />
      {children}
    </HeaderContainer>
  )
}
