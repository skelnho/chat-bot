import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function POST(req: Request) {
  try {
    const { messages, conversationId, modelSelection } = await req.json()
    const newMessage = messages[messages.length - 1]
    const session = await auth()

    if (!conversationId && !session?.user) {
      const result = streamText({
        model: openai(modelSelection.name),
        system: 'You are a helpful assistant.',
        messages,
        temperature: modelSelection.temperature,
      })

      return result.toDataStreamResponse()
    }

    if (!conversationId) {
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
      })
      const conversation = await prisma.conversation.create({
        data: {
          name: messages[0].content.slice(0, 100),
          userId: user?.id || '',
          messages: {
            create: [newMessage],
          },
        },
        include: { messages: true },
      })

      const result = streamText({
        model: openai(modelSelection.name),
        system: 'You are a helpful assistant.',
        messages,
        temperature: modelSelection.temperature,
        async onFinish({ text }) {
          if (newMessage.experimental_attachments) {
            delete newMessage.experimental_attachments
          }

          await prisma.conversation.update({
            where: { id: conversation.id },
            data: {
              updatedAt: new Date(),
              messages: {
                create: [
                  {
                    role: 'assistant',
                    content: text,
                  },
                ],
              },
            },
            include: { messages: true },
          })
        },
      })

      const streamResponse = await result.toDataStreamResponse()

      return new Response(streamResponse.body, {
        headers: {
          ...streamResponse.headers,
          'X-Conversation-Id': conversation.id,
        },
        status: streamResponse.status,
        statusText: streamResponse.statusText,
      })
    } else {
      const result = streamText({
        model: openai(modelSelection.name),
        system: 'You are a helpful assistant.',
        messages,
        temperature: modelSelection.temperature,
        async onFinish({ text }) {
          if (newMessage.experimental_attachments) {
            delete newMessage.experimental_attachments
          }

          await prisma.conversation.update({
            where: { id: conversationId },
            data: {
              updatedAt: new Date(),
              messages: {
                create: [
                  newMessage,
                  {
                    role: 'assistant',
                    content: text,
                  },
                ],
              },
            },
            include: { messages: true },
          })
        },
      })

      return result.toDataStreamResponse()
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
