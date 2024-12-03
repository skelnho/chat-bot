import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import Chat from './page'

describe('Chat Page', () => {
  it('renders', () => {
    render(<Chat />)
    expect(screen.getByText('Chat Page')).toBeInTheDocument()
  })
})
