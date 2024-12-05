import styled from 'styled-components'

export const Button = styled.button`
  all: unset;
  display: inline-block;
  cursor: pointer;
  display: flex;
  justify-content: flex;
  align-items: flex;

  &:disabled {
    cursor: not-allowed;
    color: #6b7280;
  }
`