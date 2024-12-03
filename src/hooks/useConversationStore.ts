import { create } from 'zustand'

const useConversationStore = create((set) => ({
  conversations: [],
  addConversation: (firstMessage) =>
    set((state) => ({
      conversations: [...state.conversations, { id: '1234', firstMessage: firstMessage.message, messages: [firstMessage] }],
    })),
}))

export default useConversationStore
