'use client'
import styled, { css } from 'styled-components'

type HeaderLevel = 'h1' | 'h2' | 'h3' | 'h4'

interface HeaderProps {
  level?: HeaderLevel
  color?: string
  align?: 'left' | 'center' | 'right'
  marginBottom?: string
}

// Shared styles for all headers
const baseHeaderStyles = css<HeaderProps>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  color: var(--foreground);
  text-align: ${({ align }) => align || 'left'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5em'};
  line-height: 1.2;
  font-weight: bold;
`

// Individual header styles
const H1 = styled.h1<HeaderProps>`
  ${baseHeaderStyles}
  font-size: 2.5rem;
  letter-spacing: -0.02em;
  margin-top: 0.67em;
`

const H2 = styled.h2<HeaderProps>`
  ${baseHeaderStyles}
  font-size: 2rem;
  letter-spacing: -0.015em;
  margin-top: 0.83em;
`

const H3 = styled.h3<HeaderProps>`
  ${baseHeaderStyles}
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  margin-top: 1em;
`

const H4 = styled.h4<HeaderProps>`
  ${baseHeaderStyles}
  font-size: 1.25rem;
  letter-spacing: normal;
  margin-top: 1.33em;
`

const headerComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
}

interface StyledHeaderProps extends HeaderProps {
  children: React.ReactNode
  className?: string
}

export const Header = ({ level = 'h2', children, ...props }: StyledHeaderProps) => {
  const HeaderComponent = headerComponents[level]
  return <HeaderComponent {...props}>{children}</HeaderComponent>
}

