'use client'
import { CircleX, OctagonX, Paperclip, SendHorizontal } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Message, useChat } from 'ai/react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'

import { useModelStore } from '@/hooks/useModelStore'

import { Messages } from './Messages'
import { Button } from './ui/Button'
import { Header } from './ui/Header'

export interface PromptProps {
  placeholder?: string
  conversation: unknown
}

interface FileListProps {
  files?: FileList
  setFiles: React.Dispatch<React.SetStateAction<FileList>>
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

const StyledInput = styled.textarea`
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: flex-end;
  margin-bottom: 0.75rem;
`

const AttachmentWrapper = styled.div`
  position: relative;
  width: 6rem;
  text-align: center;
`

const Image = styled.img`
  width: 6rem;
  border-radius: 0.375rem;
`

const Text = styled.span`
  font-size: 0.875rem;
  color: #4b5563;
`

const TextAttachmentWrapper = styled.div`
  width: 6rem;
  color: #4b5563;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-shrink: 0;
  font-size: 0.875rem;
`

const PreviewBox = styled.div`
  width: 4rem;
  height: 5rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
`

const CancelButton = styled(Button)`
  background: none;
  border: none;
  position: absolute;
  top: 0.15rem;
  left: 0.15rem;
  z-index: 10;
`

const FilesDisplay = ({ files, setFiles }: FileListProps) => (
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
                      //@ts-expect-error
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
                      //@ts-expect-error
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
}: PromptProps) => {
  const newConversationIdRef = useRef('')
  const { selectedModel, temperature } = useModelStore()
  const router = useRouter()
  const {
    append,
    messages,
    input,
    setInput,
    handleSubmit,
    handleInputChange,
    isLoading,
  } = useChat({
    initialMessages: conversation?.messages as Message[],
    body: {
      conversationId: conversation?.id,
      modelSelection: { name: selectedModel.name, temperature },
    },
    onResponse: (response) => {
      const newConversationId = response.headers.get('X-Conversation-Id')
      if (newConversationId) {
        newConversationIdRef.current = newConversationId
      }
    },
    onFinish: () => {
      if (newConversationIdRef.current.length) {
        router.push(`/chat/${newConversationIdRef.current}`)
      }
    },
  })

  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return
      }
      event.preventDefault()
      handleFormSubmit()
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()

    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  const handleFormSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    if (files) {
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
      {!messages.length ? (
        <Header align="center">Talk data to me.</Header>
      ) : null}
      <Messages data={messages} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FilesDisplay
          files={files}
          setFiles={setFiles as FileListProps['setFiles']}
        />
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
          <Button
            disabled={isLoading || !input.length}
            //@ts-expect-error
            onClick={handleFormSubmit}
          >
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
