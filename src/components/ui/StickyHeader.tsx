'use client'
import styled from 'styled-components'
import React from 'react'

export interface HeaderProps {
  children?: React.ReactNode
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 4rem;
  z-index: 50;
`

export const StickyHeader = ({
  children,
  ...props
}: HeaderProps) => {
  return (
    <StyledHeader {...props}>
        {children}
    </StyledHeader>
  )
}
