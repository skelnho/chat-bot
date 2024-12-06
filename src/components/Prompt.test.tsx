import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { Prompt } from './Prompt'
import { useChat } from 'ai/react'
import '@testing-library/jest-dom'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    pathname: '/current-path',
    query: {},
    asPath: '/current-path',
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
  usePathname: () => '/current-path',
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock('ai/react')

describe('Prompt Component', () => {
    const mockUseChat = {
      append: vi.fn(),
      messages: [],
      input: '',
      setInput: vi.fn(),
      handleSubmit: vi.fn(),
      handleInputChange: vi.fn(),
      isLoading: false,

      error: undefined,
      reload: vi.fn(),
      stop: vi.fn(),
      setMessages: vi.fn(),
      setData: vi.fn(),
      addToolResult: vi.fn(),
    }

  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(useChat).mockReturnValue(mockUseChat)
  })

  test('renders with default placeholder', () => {
    render(<Prompt />)
    expect(screen.getByPlaceholderText(/send/i)).toBeInTheDocument()
  })

    test('shows header when no messages exist', () => {
      render(<Prompt />)
      expect(screen.getByText('Talk data to me.')).toBeInTheDocument()
    })

    test('hides header when messages exist', () => {
        vi.mocked(useChat).mockReturnValue({...mockUseChat, messages: [{ id: 'test', content: 'test', role: 'user' }]})

      render(<Prompt />)
      expect(screen.queryByText('Talk data to me.')).not.toBeInTheDocument()
    })

    test('handles text input changes', () => {
      render(<Prompt />)
      const input = screen.getByPlaceholderText('Send a message...')
      fireEvent.change(input, { target: { value: 'test message' } })
      expect(mockUseChat.handleInputChange).toHaveBeenCalled()
    })

    test('handles form submission', async () => {
      render(<Prompt />)
      const form = screen.getByRole('form')
      fireEvent.submit(form)
      expect(mockUseChat.handleSubmit).toHaveBeenCalled()
    })

    test('handles Enter key press for submission', () => {
      render(<Prompt />)
      const input = screen.getByPlaceholderText('Send a message...')
      fireEvent.keyDown(input, { key: 'Enter' })
      expect(mockUseChat.handleSubmit).toHaveBeenCalled()
    })

    test('allows Shift+Enter without submission', () => {
      render(<Prompt />)
      const input = screen.getByPlaceholderText('Send a message...')
      fireEvent.keyDown(input, { key: 'Enter', shiftKey: true })
      expect(mockUseChat.handleSubmit).not.toHaveBeenCalled()
    })

    test('handles file upload', async () => {
      global.URL.createObjectURL = vi.fn();
      render(<Prompt />)
      const file = new File(['hello'], 'hello.png', { type: 'image/png' })
      const input = screen.getByTestId('file-input') as HTMLInputElement

      await userEvent.upload(input, file)

      //@ts-expect-error
      expect(input.files[0]).toBe(file)
      expect(input.files).toHaveLength(1)
    })

    test('disables submit button when input is empty', () => {
      vi.mocked(useChat).mockReturnValue({
        ...mockUseChat,
        input: '',
      })
      render(<Prompt />)
      expect(screen.getByTestId('submit-button')).toBeDisabled()
    })

    test('enables submit button when input has content', () => {
      vi.mocked(useChat).mockReturnValue({
        ...mockUseChat,
        input: 'test message',
      })
      render(<Prompt />)
      expect(screen.getByTestId('submit-button')).toBeEnabled()
    })
})
