'use client'
import { CircleX, OctagonX, Paperclip, SendHorizontal } from 'lucide-react'
import React, { useRef, InputHTMLAttributes, useState } from 'react'
import { useChat } from 'ai/react'
import styled from 'styled-components'
import { Messages } from './Messages'
import { useRouter } from 'next/navigation'
import { Button } from './Button'
import { useModelStore } from '@/hooks/useModelStore'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  conversation?: unknown
}

interface StyledInputProps {
  error?: string
}

const FormWrapper = styled.form`
  position: relative;
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
  background-color: #2f2f2f;
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

// TODO: put this elsewhere
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem; /* gap-2 equivalent */
  align-items: flex-end;
  margin-bottom: 0.75rem;
`

const AttachmentWrapper = styled.div`
  position: relative;
  width: 6rem; /* w-24 equivalent */
  text-align: center;
`

const Image = styled.img`
  width: 6rem; /* w-24 equivalent */
  border-radius: 0.375rem; /* rounded-md equivalent */
`

const Text = styled.span`
  font-size: 0.875rem; /* text-sm equivalent */
  color: #4b5563; /* text-zinc-500 equivalent */
`

const TextAttachmentWrapper = styled.div`
  width: 6rem; /* w-24 equivalent */
  color: #4b5563; /* text-zinc-500 equivalent */
  display: flex;
  flex-direction: column;
  gap: 0.25rem; /* gap-1 equivalent */
  flex-shrink: 0;
  font-size: 0.875rem; /* text-sm equivalent */
`

const PreviewBox = styled.div`
  width: 4rem; /* w-16 equivalent */
  height: 5rem; /* h-20 equivalent */
  background-color: #f3f4f6; /* bg-zinc-100 equivalent */
  border-radius: 0.375rem; /* rounded-md equivalent */
`

const CancelButton = styled(Button)`
  background: none;
  border: none;
  position: absolute;
  top: 0.15rem; /* Adjust to move the button away from the edges */
  left: 0.15rem;
  z-index: 10; /* Ensure the icon is on top of the content */
`

const FilesDisplay = ({ files, setFiles }) => (
  <Container>
    {files
      ? Array.from(files).map((attachment) => {
          const { type } = attachment

          if (type.startsWith('image/')) {
            return (
              <AttachmentWrapper key={attachment.name}>
                <CancelButton
                  onClick={() => {
                    setFiles((prevFiles) => {
                      const newFiles = { ...prevFiles }
                      delete newFiles[attachment?.name]
                      return newFiles
                    })
                  }}
                >
                  <CircleX
                    size={18}
                    color="black"
                    style={{ position: 'absolute', top: 0 }}
                  />
                </CancelButton>
                <Image
                  src={URL.createObjectURL(attachment)}
                  alt={attachment.name}
                />
                <Text>{attachment.name}</Text>
              </AttachmentWrapper>
            )
          } else if (type.startsWith('text/')) {
            return (
              <TextAttachmentWrapper key={attachment.name}>
                <CancelButton
                  onClick={() => {
                    setFiles((prevFiles) => {
                      const newFiles = { ...prevFiles }
                      delete newFiles[attachment?.name]
                      return newFiles
                    })
                  }}
                >
                  <CircleX />
                </CancelButton>
                <PreviewBox />
                <Text>{attachment.name}</Text>
              </TextAttachmentWrapper>
            )
          }
        })
      : ''}
  </Container>
)

export const Prompt = ({
  placeholder = 'Send a message...',
  conversation,
  ...props
}: InputProps) => {
  const initialMessages = conversation?.messages || []
  const { selectedModel, temperature } = useModelStore()
  const {
    append,
    messages,
    input,
    setInput,
    handleSubmit,
    handleInputChange,
    isLoading,
  } = useChat({ initialMessages, body: { conversationId: conversation?.id, modelSelection: { name: selectedModel.name, temperature } } })

  const [files, setFiles] = useState<FileList | undefined>(undefined)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return
      }
      event.preventDefault()
      handleFormSubmit(event)
    }
  }

  const fileInputRef = useRef(null)

  const handleUpload = (e) => {
    e.preventDefault()

    if (e.target.files) {
      console.log(e.target.files)
      setFiles(e.target.files)
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (files?.length) {
      append(
        { role: 'user', content: input },
        {
          experimental_attachments: files,
        }
      )

      setInput('')

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else {
      handleSubmit()
    }
  }

  return (
    <>
      <Messages data={messages} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FilesDisplay files={files} setFiles={setFiles} />
        <FormWrapper onSubmit={handleFormSubmit}>
          <Button
            disabled={isLoading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} style={{ marginRight: '.4rem' }} />
          </Button>
          <StyledInput
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            {...props}
          />
          <Button disabled={isLoading} onClick={handleFormSubmit}>
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
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
        </FormWrapper>
      </div>
    </>
  )
}
