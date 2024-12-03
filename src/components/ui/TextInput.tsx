'use client'
import { Paperclip, SendHorizontal } from 'lucide-react'
import Link from 'next/link'
import React, { InputHTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import useConversationStore from '@/hooks/useConversationStore'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
}

interface StyledInputProps {
  error?: string
}

const InputWrapper = styled.div`
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

export const TextInput = ({
  placeholder = 'Message ChatBot',
  error = '',
  disabled = false,
  required = false,
  type = 'text',
  ...props
}: InputProps) => {
  const [text, setText] = useState('')
  const { addConversation } = useConversationStore()

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleMessage = () => {
    addConversation({ id: '123', sender: 'person', message: text })
  }

  return (
    <InputWrapper>
      <Paperclip className="click" onClick={handleUpload} />

      <StyledInput
        value={text}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        error={error}
        {...props}
      />
      <Link
        href="/chat/123"
        style={{
          display: 'flex',
          alignItems: 'center',
          pointerEvents: !text.length ? 'none' : 'auto',
        }}
      >
        <SendHorizontal
          onClick={handleMessage}
          color={!text.length ? 'gray' : 'black'}
        />
      </Link>
    </InputWrapper>
  )
}
