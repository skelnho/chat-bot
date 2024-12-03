'use client'
import styled from 'styled-components'
import { Bot } from 'lucide-react'

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
  margin-bottom: 1rem;
`

interface ConversationDetailProps {
    sender: string
}

const ConversationDetail = styled.div<ConversationDetailProps>`
  display: flex;
  flex: 1;
  justify-content: ${({ sender }) =>
    sender === 'person' ? 'flex-end' : 'flex-start'};
`

const UserMessage = styled.p`
  background-color: #2f2f2f;
  border-radius: 1.25rem;
  padding: 0.75rem;
  font-weight: bold;
  font-size: 16px;
  color: #FFF;
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

const mockConversations = [
  {
    id: '1234',
    name: 'test',
    message: 'sup',
    sender: 'person',
  },
  {
    id: '1235',
    name: 'test',
    message: `Here’s an example of a styled component in React to create a conversation list similar to the one used in this application. I'll assume you're using Styled Components for styling.`,
    sender: 'bot',
  },
]

export const Conversation = ({ conversations = mockConversations }) => {
  return (
    <ConversationList>
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id}>
          <ConversationDetail sender={conversation.sender}>
            {conversation.sender === 'person' ? (
              <UserMessage>{conversation.message}</UserMessage>
            ) : (
              <BotWrapper>
                <Bot size={40} />
                <BotMessage>{conversation.message}</BotMessage>
              </BotWrapper>
            )}
          </ConversationDetail>
        </ConversationItem>
      ))}
    </ConversationList>
  )
}
