'use client'
import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

import { useModelStore } from '@/hooks/useModelStore'

const Container = styled.div`
  position: relative;
  width: 288px;
`

const DropdownButton = styled.button`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.5rem;
  border: none;
  background-color: #1f2937;
  transition: background-color 0.2s;

  &:hover {
    background-color: #374151;
  }
`

const ChevronIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s;
  transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`

const DropdownContent = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 0.5rem;
  background-color: #1f2937;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const OptionContainer = styled.div`
  border-bottom: 1px solid #374151;
  &:last-child {
    border-bottom: none;
  }
`

const Option = styled.button`
  width: 100%;
  padding: 1rem;
  text-align: left;
  background: none;
  border: none;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #374151;
  }
`

const SliderContainer = styled.div`
  padding: 1rem;
`

const OptionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const TextContainer = styled.div`
  flex-grow: 1;
`

const OptionTitle = styled.div`
  color: white;
  margin-bottom: 0.25rem;
`

const OptionDescription = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
`

const CheckIcon = styled(Check)`
  width: 1rem;
  height: 1rem;
  color: #3b82f6;
`

const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
  height: 8px;
  background: #4b5563;
  border-radius: 0.25rem;
  appearance: none;
  margin: 0.75rem 0;
`

const SliderValue = styled.div`
  color: #9ca3af;
  font-size: 0.875rem;
  text-align: right;
`

export const ModelSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    selectedModel,
    temperature,
    models,
    setSelectedModel,
    setTemperature,
  } = useModelStore()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Container ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedModel.name}</span>
        <ChevronIcon $isOpen={isOpen} />
      </DropdownButton>

      {isOpen && (
        <DropdownContent>
          {models.map((model) => (
            <OptionContainer key={model.name}>
              <Option
                onClick={() => {
                  setSelectedModel(model)
                  setIsOpen(false)
                }}
              >
                <OptionContent>
                  <TextContainer>
                    <OptionTitle>{model.name}</OptionTitle>
                    <OptionDescription>{model.description}</OptionDescription>
                  </TextContainer>
                  {selectedModel.name === model.name && <CheckIcon />}
                </OptionContent>
              </Option>
            </OptionContainer>
          ))}
          <OptionContainer>
            <SliderContainer>
              <TextContainer>
                <OptionTitle>Temperature</OptionTitle>
                <OptionDescription>
                  Adjust response creativity
                </OptionDescription>
              </TextContainer>
              <Slider
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
              />
              <SliderValue>{temperature.toFixed(1)}</SliderValue>
            </SliderContainer>
          </OptionContainer>
        </DropdownContent>
      )}
    </Container>
  )
}
