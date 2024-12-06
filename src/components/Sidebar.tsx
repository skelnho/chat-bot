'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { PanelLeftDashed, SquarePen } from 'lucide-react'
import Link from 'next/link'
import { Session } from 'next-auth'

import { Prisma } from '@prisma/client'

import { Button } from './ui/Button'

interface SidebarProps {
  isOpen?: boolean
  conversations?:
    | Prisma.ConversationGetPayload<{
        select: { name: true; id: true; updatedAt: true }
      }>[]
    | null
  session: Session | null
}

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  height: 100vh;
  width: ${({ $isOpen }) => ($isOpen ? '240px' : '0')};
  background: #1a1a1a;
  color: #ffffff;
  transition: all 0.3s ease;
  overflow-x: hidden;
  z-index: 1000;
`

const ToggleButton = styled(Button)`
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 1001;
`

const Content = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: .25rem;
  padding: 20px;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  color: #fff;
`

const LinkText = styled.p`
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  background: transparent;

  &:hover {
    background: #262626;
  }
`

export const Sidebar = ({
  isOpen: defaultIsOpen = true,
  conversations,
  session,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <PanelLeftDashed size={20} />
      </ToggleButton>

      <SidebarContainer $isOpen={isOpen}>
        <Content $isOpen={isOpen}>
          <Link href="/" style={{ marginLeft: '90%' }}>
            <SquarePen size={20} />
          </Link>
          <>
            {!session ? (
              <p>Login to save and revisit previous chats!</p>
            ) : (
              conversations?.map((conversation) => (
                <Link key={conversation.id} href={`/chat/${conversation.id}`}>
                  <LinkText id={conversation.id}>{conversation.name}</LinkText>
                </Link>
              ))
            )}
          </>
        </Content>
      </SidebarContainer>
    </>
  )
}
