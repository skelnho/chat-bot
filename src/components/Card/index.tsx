'use client'
import * as React from 'react'
import styled from 'styled-components'

export type CardProps = {
  foo?: string
}

const Container = styled.div`
`

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ foo = 'bar' }, ref) => {
    return <Container ref={ref} data-testid="component-card">{foo}</Container>
  }
)

Card.displayName = 'Card'
