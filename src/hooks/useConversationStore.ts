import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import _ from 'lodash'

const useConversationStore = create(
  persist(
    (set, get) => ({
      conversations: [],
      addConversation: (firstMessage, id) =>
        set((state) => ({
          conversations: [
            ...state.conversations,
            {
              id,
              firstMessage: firstMessage.message,
              messages: [{ id: firstMessage.message.slice(0, 4) , ...firstMessage }],
            },
          ],
        })),
      getConversation: (id) => {
        const conversation = get().conversations.find((conv) => conv.id === id)
        return conversation
      },
    }),

    {
      name: 'conversation-storage',
    }
  )
)

export default useConversationStore
