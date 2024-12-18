import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

import type { Message } from 'ai'

export interface MessageProps {
  data: Message[]
}

const ConversationItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const ConversationDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const UserMessage = styled.p`
  background-color: #2f2f2f;
  margin-left: auto;
  border-radius: 1.25rem;
  padding: 0.75rem 1rem;
  font-size: 16px;
  color: #fff;
`

const BotWrapper = styled.div`
  padding: 0.75rem;
  display: flex;
  flex: 1;
  align-items: flex-end;
  gap: 1rem;
  color: var(--foreground);
`

const BotMessage = styled.div`
  display: 'flex';
  flex-direction: 'column';
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  padding: 1rem;
`

const AutoScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<Sy>(null)

  useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }

    scrollToBottom()
  }, [children])

  return <StyledDiv ref={containerRef}>{children}</StyledDiv>
}

export const Messages = ({ data }: MessageProps) => {
  if (!data.length) {
    return null
  }
  return (
    <>
      <AutoScroll>
        {data?.map((message) => (
          <ConversationItem key={message.id}>
            <ConversationDetail>
              {message.role === 'user' ? (
                <UserMessage>{message.content}</UserMessage>
              ) : (
                <BotWrapper>
                  <BotMessage>
                    <ReactMarkdown
                      components={{
                        code(props) {
                          const { children, className, ...rest } = props
                          const match = /language-(\w+)/.exec(className || '')
                          return match ? (
                            //@ts-expect-error
                            <SyntaxHighlighter
                              {...rest}
                              PreTag="div"
                              language={match[1]}
                              style={tomorrow}
                              customStyle={{
                                borderRadius: '.5rem',
                                backgroundColor: 'black',
                              }}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code {...rest} className={className}>
                              {children}
                            </code>
                          )
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </BotMessage>
                </BotWrapper>
              )}
            </ConversationDetail>
          </ConversationItem>
        ))}
      </AutoScroll>
    </>
  )
}
