'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { PanelLeftDashed, SquarePen } from 'lucide-react'
import Link from 'next/link'
import useConversationStore from '@/hooks/useConversationStore'

interface SidebarProps {
  isOpen?: boolean
}

const SidebarContainer = styled.div<SidebarProps>`
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? '240px' : '0')};
  background: #1a1a1a;
  color: #ffffff;
  transition: all 0.3s ease;
  overflow-x: hidden;
  z-index: 1000;
`

const ToggleButton = styled.button`
  position: fixed;
  left: 20px;
  top: 20px;
  width: 24px;
  height: 24px;
  background: #ffffff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1001;

  &:hover {
    background: #f0f0f0;
  }
`

const Content = styled.div<SidebarProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  color: #fff;
`

export const Sidebar = ({ isOpen: defaultIsOpen = true }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const { conversations } = useConversationStore()

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <PanelLeftDashed size={16} />
      </ToggleButton>

      <SidebarContainer isOpen={isOpen}>
        <Content isOpen={isOpen}>
          <Link href="/" style={{ marginLeft: '180px' }}>
            <SquarePen size={22} />
          </Link>
          <ol>
            {conversations?.map((conversation) => {
              return <li>{conversation.firstMessage}</li>
            })}
          </ol>
        </Content>
      </SidebarContainer>
    </>
  )
}
