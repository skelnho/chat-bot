'use server'
import { prisma } from '@/lib/prisma'

// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getConversation(conversationId: string) {
  try {
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
        userId: 'cm4ahnmzy0000c828xnbacz44',
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
    const conversations = await prisma.conversation.findMany({
      take: 40,
      select: {
        name: true,
        id: true,
        updatedAt: true,
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
  } catch (error) {
    console.error('Error fetching sidebar conversations:', error)
    throw error
  }
}
