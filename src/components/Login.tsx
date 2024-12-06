'use client'
import styled from 'styled-components'
import { Session } from 'next-auth'

import { logIn, logOut } from '@/app/actions'

import { TooltipWrapper, TooltipContent } from './ui/ToolTip'

export interface LoginProps {
  session: Session | null
}

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #1f2937;
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  max-width: fit-content;

  &:hover {
    background-color: #374151;
  }
`

const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

const UserName = styled.span`
  font-weight: 500;
`

const LoginButton = styled.button`
  color: #e2e8f0;
  background-color: #1f2937;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #374151;
  }
`

export const Login = async ({ session }: LoginProps) => {
  if (session?.user) {
    const { name, image } = session.user

    return (
      <TooltipWrapper>
        <BadgeContainer onClick={logOut}>
          {image && <ProfileImage src={image} alt={`${name}'s profile`} />}
          <UserName>{name}</UserName>
        </BadgeContainer>
        <TooltipContent>Logout</TooltipContent>
      </TooltipWrapper>
    )
  }

  return (
    <form action={logIn}>
      <LoginButton type="submit">Login</LoginButton>
    </form>
  )
}
