'use client'
import styled, { css } from 'styled-components'

type HeaderType = 'h1' | 'h2' | 'h3' | 'h4'

interface HeaderProps {
  type?: HeaderType
  color?: string
  align?: 'left' | 'center' | 'right'
  marginBottom?: string
}

const baseHeaderStyles = css<HeaderProps>`
  color: var(--foreground);
  text-align: ${({ align }) => align || 'left'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5em'};
  line-height: 1.2;
  font-weight: bold;
`

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

export const Header = ({
  type = 'h2',
  children,
  ...props
}: StyledHeaderProps) => {
  const HeaderComponent = headerComponents[type]
  return <HeaderComponent {...props}>{children}</HeaderComponent>
}
