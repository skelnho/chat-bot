import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Messages } from './Messages'
import { Message } from 'ai'

vi.mock('react-syntax-highlighter', () => ({
  Prism: vi.fn(({ children }) => <pre>{children}</pre>)
}))

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  tomorrow: {}
}))

describe('Messages', () => {
  const mockMessages = [
    {
      id: '1',
      role: 'user',
      content: 'Hello there'
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Hi! How can I help you?'
    },
    {
      id: '3',
      role: 'user',
      content: 'Show me some code'
    },
    {
      id: '4',
      role: 'assistant',
      content: 'Here is a code example:\n```javascript\nconsole.log("hello");\n```'
    }
  ] as Message[]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders nothing when no messages are provided', () => {
    const { container } = render(<Messages data={[]} />)
    expect(container.firstChild).toBeNull()
  })

  test('renders all messages in the conversation', () => {
    render(<Messages data={mockMessages} />)
    
    expect(screen.getByText('Hello there')).toBeInTheDocument()
    expect(screen.getByText('Hi! How can I help you?')).toBeInTheDocument()
    expect(screen.getByText('Show me some code')).toBeInTheDocument()
  })

  test('renders user messages with correct styling', () => {
    render(<Messages data={mockMessages} />)
    
    const userMessage = screen.getByText('Hello there')
    expect(userMessage).toHaveStyle({
      backgroundColor: '#2f2f2f',
      color: '#fff'
    })
  })

  test('renders assistant messages with markdown', () => {
    render(<Messages data={mockMessages} />)
    
    expect(screen.getByText('console.log("hello");')).toBeInTheDocument()
  })

  test('renders code blocks with syntax highlighting', () => {
    const messageWithCode = [{
      id: '1',
      role: 'assistant',
      content: '```python\nprint("Hello")\n```'
    }] as Message[]
    
    render(<Messages data={messageWithCode} />)
    
    const preElement = screen.getByText('print("Hello")')
    expect(preElement.tagName).toBe('PRE')
  })

  test('renders inline code correctly', () => {
    const messageWithInlineCode = [{
      id: '1',
      role: 'assistant',
      content: 'Use `console.log()` for debugging'
    }] as Message[]
    
    render(<Messages data={messageWithInlineCode} />)
    
    const codeElement = screen.getByText('console.log()')
    expect(codeElement.tagName).toBe('CODE')
  })

  test('auto-scrolls to bottom when new messages are added', () => {
    const scrollIntoViewMock = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoViewMock
    
    const { rerender } = render(<Messages data={mockMessages.slice(0, 2)} />)
    
    rerender(<Messages data={mockMessages} />)
    
    const container = screen.getByText('console.log("hello");').closest('div')
    expect(container).toBeInTheDocument()
  })

  test('maintains proper message order', () => {
    render(<Messages data={mockMessages} />)
    
    const messages = screen.getAllByText(/Hello there|Hi! How can I help you?|Show me some code/i)
    expect(messages[0]).toHaveTextContent('Hello there')
    expect(messages[1]).toHaveTextContent('Hi! How can I help you?')
    expect(messages[2]).toHaveTextContent('Show me some code')
  })

  test('handles empty message content', () => {
    const messagesWithEmpty = [
      {
        id: '1',
        role: 'user',
        content: ''
      }
    ] as Message[]

    render(<Messages data={messagesWithEmpty} />)
    const emptyMessage = screen.queryByRole('paragraph')
    expect(emptyMessage).toBeInTheDocument()
  })

  test('handles special markdown characters in messages', () => {
    const messageWithMarkdown = [{
      id: '1',
      role: 'assistant',
      content: '**bold** and *italic* and [link](http://example.com)'
    }] as Message[]
    
    render(<Messages data={messageWithMarkdown} />)
    
    expect(screen.getByText('bold')).toHaveStyle({ fontWeight: 'bold' })
    expect(screen.getByText('italic')).toHaveStyle({ fontStyle: 'italic' })
    expect(screen.getByText('link')).toHaveAttribute('href', 'http://example.com')
  })
})