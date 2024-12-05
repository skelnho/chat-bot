'use client'
import { Paperclip, SendHorizontal } from 'lucide-react'
import React, { InputHTMLAttributes } from 'react'
import { useChat } from 'ai/react'
import styled from 'styled-components'
import { Messages } from './Messages'
import { useRouter } from 'next/navigation'

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
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 1.25rem;
  padding: 0 0.75rem;
  margin-bottom: 1rem;
`

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #1f2937;
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
  placeholder = 'Message Chatbot',
  conversation,
  ...props
}: InputProps) => {
  const initialMessages = conversation?.messages || []
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
  } = useChat({ initialMessages, body: { conversationId: conversation?.id } })


  return (
    <>
      <Messages data={messages} />
      <InputWrapper onSubmit={handleSubmit}>
        <Paperclip className="click" onClick={handleUpload} />
        <StyledInput
          value={input}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={isLoading}
          {...props}
        />
        <SendHorizontal
          className="click"
          onClick={handleSubmit}
          color={isLoading ? 'gray' : 'black'}
        />
      </InputWrapper>
    </>
  )
}
