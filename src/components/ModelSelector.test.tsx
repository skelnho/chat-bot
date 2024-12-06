import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useModelStore } from '../hooks/useModelStore'

import '@testing-library/jest-dom'

import { ModelSelector } from './ModelSelector'

const setTemperature = vi.fn()
vi.mock('@/hooks/useModelStore', () => ({
  useModelStore: () => ({
    selectedModel: {
      name: 'gpt-4o-mini',
      description: 'Small model for fast, lightweight tasks',
    },
    temperature: 0.7,
    models: [
      {
        name: 'gpt-4o-mini',
        description: 'Small model for fast, lightweight tasks',
      },
      {
        name: 'gpt-4o',
        description: 'For complex, multi-step tasks (login to continue)',
      },
    ],
    setSelectedModel: vi.fn(),
    setTemperature,
  }),
}))

describe('ModelSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders with initial selected model', () => {
    render(<ModelSelector />)
    expect(screen.getByText('gpt-4o-mini')).toBeInTheDocument()
  })

  test('opens dropdown when clicked', async () => {
    render(<ModelSelector />)
    const button = screen.getByRole('button', { name: /gpt/i })
    await userEvent.click(button)

    expect(screen.getAllByText('gpt-4o-mini')[0]).toBeInTheDocument()
  })

  test('allows temperature adjustment', async () => {
    render(<ModelSelector />)

    const button = screen.getByRole('button', { name: /GPT-4/i })
    await userEvent.click(button)

    const slider = screen.getByRole('slider') as HTMLInputElement
    fireEvent.change(slider, { target: { value: '0.5' } })

    expect(setTemperature).toHaveBeenCalledWith(0.5)
    expect(screen.getByText('0.7')).toBeInTheDocument()
  })

  test('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <ModelSelector />
      </div>
    )

    // Open dropdown
    const button = screen.getByRole('button', { name: /GPT-4/i })
    await userEvent.click(button)

    expect(screen.getByText('Temperature')).toBeInTheDocument()

    const outsideElement = screen.getByTestId('outside')
    await userEvent.click(outsideElement)

    expect(screen.queryByText('Temperature')).not.toBeInTheDocument()
  })
})
