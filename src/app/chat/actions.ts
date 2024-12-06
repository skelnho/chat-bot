'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getConversation(conversationId: string) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return new Response('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.email) {
    //   throw new Error('Unauthorized')
    // }

    // const user = await prisma.user.findUnique({
    //   where: { email: session.user.email }
    // })

    // if (!user) {
    //   throw new Error('User not found')
    // }

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

      const now = new Date()

      // Categorize conversations into buckets
      const buckets = {
        today: [],
        yesterday: [],
        previous7Days: [],
      }

      conversations.forEach((conversation) => {
        const updatedAt = new Date(conversation.updatedAt)

        // Calculate the difference in days
        const diffInDays = Math.floor((now - updatedAt) / (1000 * 60 * 60 * 24))

        if (diffInDays === 0) {
          buckets.today.push(conversation)
        } else if (diffInDays === 1) {
          buckets.yesterday.push(conversation)
        } else if (diffInDays > 1 && diffInDays <= 7) {
          buckets.previous7Days.push(conversation)
        }
      })

      return buckets
    }
  } catch (error) {
    console.error('Error fetching sidebar conversations:', error)
    throw error
  }
}
