import { create } from 'zustand'

type Model = {
  name: string
  description: string
}

interface ModelState {
  selectedModel: Model
  temperature: number
  models: Model[]
  setSelectedModel: (model: Model) => void
  setTemperature: (temp: number) => void
}

export const useModelStore = create<ModelState>((set) => ({
  selectedModel: {
    name: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  temperature: 0.7,
  models: [
    {
      name: 'gpt-4o-mini',
      description: 'Small model for fast, lightweight tasks',
    },
    {
      name: 'gpt-4o',
      description: 'For complex, multi-step tasks (login to continue)',
    },
  ],
  setSelectedModel: (model) => set({ selectedModel: model }),
  setTemperature: (temp) => set({ temperature: temp }),
}))
