'use client'
import React from 'react'

import { StickyHeader } from './ui/StickyHeader'
import { ModelSelector } from './ModelSelector'

export interface NavProps {
  children: React.ReactNode
}

export const Nav = ({ children }: NavProps) => {
  return (
    <StickyHeader>
      <ModelSelector />
      {children}
    </StickyHeader>
  )
}
