import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './'

describe('Card component', () => {
  it('renders', () => {
    render(<Card />)
    expect(screen.getByTestId('component-card')).not.toBeNull()
  })
})
