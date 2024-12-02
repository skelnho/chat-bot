'use client'
import React from 'react'
import styled from 'styled-components'
import { TextInput } from './ui/TextInput'

export type ChatBoxProps = {

}


const ChatBoxWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  font-size: 1rem;

  @media (min-width: 1024px) {
    justify-content: center;
  }

  @media (min-width: 768px) {
    max-width: 48rem;
  }

  @media (min-width: 1024px) {
    max-width: 40rem;
  }

  @media (min-width: 1280px) {
    max-width: 48rem;
  }
`

const HeaderWrapper = styled.div`
  display: none;
  text-align: center;

  @media (min-width: 1024px) {
    display: block;
  }
`;



export const ChatBox  = ({
  ...props
}: ChatBoxProps) => {
  return (
    <ChatBoxWrapper>
        <HeaderWrapper>
            <h1>What can I help with?</h1>
        </HeaderWrapper>
        <TextInput placeholder='Message ChatBot' />
    </ChatBoxWrapper>
  )
}
