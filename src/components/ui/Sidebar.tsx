'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { PanelLeftDashed } from 'lucide-react'

interface SidebarProps {
  isOpen?: boolean
  children?: React.ReactNode
}

const SidebarContainer = styled.div<SidebarProps>`
  position: fixed;
  left: 0;
  top: 0;
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
  padding: 20px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  margin-left: auto;
`

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen: defaultIsOpen = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <PanelLeftDashed size={16} />
      </ToggleButton>

      <SidebarContainer isOpen={isOpen}>
        <Content isOpen={isOpen}>
          {children}
        </Content>
      </SidebarContainer>
    </>
  )
}
