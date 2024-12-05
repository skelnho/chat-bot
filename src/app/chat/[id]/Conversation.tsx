'use client'
import styled from 'styled-components'
import { Bot } from 'lucide-react'
import { TextInput } from '@/components/ui/Prompt'
import React, { useEffect } from 'react'
import { generateRandomId } from '@/lib/utils'

const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding: 1rem;
`

const ConversationItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

interface ConversationDetailProps {
  sender: string
}

const ConversationDetail = styled.div<ConversationDetailProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const UserMessage = styled.p`
  background-color: #2f2f2f;
  border-radius: 1.25rem;
  padding: 0.75rem;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
`

const BotWrapper = styled.div`
  padding: 0.75rem;
  display: flex;
  flex: 1;
  align-items: flex-end;
  gap: 1rem;
`

const BotMessage = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: black;
`

export const MessageList = ({ data }: { data: unknown }) => {

  return (
    <>
      <ConversationList>
        {conversation?.messages?.map((message) => (
          <ConversationItem key={message.id}>
            <ConversationDetail sender={message.sender}>
              <UserMessage style={{ marginLeft: 'auto' }}>
                {message.question}
              </UserMessage>
              <BotWrapper>
                <Bot size={40} />
                <BotMessage>{message.answer}</BotMessage>
              </BotWrapper>
            </ConversationDetail>
          </ConversationItem>
        ))}
      </ConversationList>
    </>
  )
}
