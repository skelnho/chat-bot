'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function getConversation(conversationId: string) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return new Response('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: user?.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!conversation) {
      throw new Error('Conversation not found')
    }

    return conversation
  } catch (error) {
    console.error('Error fetching conversation:', error)
    throw error
  }
}

export async function getSidebarConversations() {
  try {
    const session = await auth()
    if (session?.user?.email) {
      const conversations = await prisma.conversation.findMany({
        take: 40,
        where: {
          userId: session.user.id,
        },
        select: {
          name: true,
          id: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      })

      return conversations
    }
  } catch (error) {
    console.error('Error fetching sidebar conversations:', error)
    throw error
  }
}
