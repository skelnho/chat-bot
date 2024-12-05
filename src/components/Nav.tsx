'use client'
import styled from 'styled-components';
import { ModelSelector } from './ui/ModelSelector';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 4rem;
  z-index: 50;
`;

const LoginButton = styled.button`
  background-color: #1f2937;
  color: #e2e8f0;
  border: 1px solid #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2d3748;
    border-color: #718096;
  }
`;

export const Nav = () => {
  return (
    <HeaderContainer>
      <ModelSelector />
      <LoginButton>Login</LoginButton>
    </HeaderContainer>
  );
};