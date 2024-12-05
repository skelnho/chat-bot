'use client'
import { OctagonX, Paperclip, SendHorizontal } from 'lucide-react'
import React, { InputHTMLAttributes } from 'react'
import { useChat } from 'ai/react'
import styled from 'styled-components'
import { Messages } from './Messages'
import { useRouter } from 'next/navigation'
import { Button } from './Button'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  conversation?: unknown
}

interface StyledInputProps {
  error?: string
}

const InputWrapper = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  border-radius: 1.25rem;
  padding: 0 0.75rem;
  margin-bottom: 1rem;
`

const StyledInput = styled.textarea<StyledInputProps>`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--foreground);
  background-color: #2F2F2F;
  border: none;

  &:focus {
    outline: none;
    border-color: none;
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    color: #6b7280;
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 640px) {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }
`

const handleUpload = () => {
  console.log('hello')
}

export const Prompt = ({
  placeholder = 'Send a message...',
  conversation,
  ...props
}: InputProps) => {
  const initialMessages = conversation?.messages || []
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({ initialMessages, body: { conversationId: conversation?.id } })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return
      }
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <Messages data={messages} />
      <InputWrapper onSubmit={handleSubmit}>
        <Button disabled={isLoading} onClick={handleUpload}>
          <Paperclip size={20} style={{ marginRight: '.4rem' }} />
        </Button>
        <StyledInput
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          {...props}
        />
        <Button disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? (
            <OctagonX
              size={20}
              style={{
                marginLeft: '.4rem',
              }}
            />
          ) : (
            <SendHorizontal
              size={20}
              style={{
                marginLeft: '.4rem',
              }}
            />
          )}
        </Button>
      </InputWrapper>
    </>
  )
}
