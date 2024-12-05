import styled from 'styled-components'
import { Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
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

const ConversationDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const UserMessage = styled.p`
  background-color: #2F2F2F;
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

const BotMessage = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: black;
`

export const Messages = ({ data }: { data: unknown }) => {
  if (data?.length) {
    return (
      <>
        <ConversationList>
          {data?.map((message) => (
            <ConversationItem key={message.id}>
              <ConversationDetail>
                {message.role === 'user' ? (
                  <UserMessage style={{ marginLeft: 'auto' }}>
                    {message.content}
                  </UserMessage>
                ) : (
                  <BotWrapper>
                    {/* <Bot size={30} /> */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <ReactMarkdown
                        components={{
                          code(props) {
                            const { children, className, node, ...rest } = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
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
                    </div>
                    {/* <BotMessage></BotMessage> */}
                  </BotWrapper>
                )}
              </ConversationDetail>
            </ConversationItem>
          ))}
        </ConversationList>
      </>
    )
  }
}
