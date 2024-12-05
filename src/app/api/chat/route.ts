import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.email) {
    //   return new Response('Unauthorized', { status: 401 })
    // }

    const { messages, conversationId, modelSelection } = await req.json()
    const newMessage = messages[messages.length - 1]

    console.log(modelSelection)

    // Get user from database
    // const user = await prisma.user.findUnique({
    //   where: { email: session.user.email }
    // })

    // if (!user) {
    //   return new Response('User not found', { status: 404 })
    // }

    // Generate AI response
    const result = streamText({
      model: openai(modelSelection.name),
      system: 'You are a helpful assistant.',
      messages,
      temperature: modelSelection.temperature,
      async onFinish({ text }) {
        let conversation

        if (newMessage.experimental_attachments) {
          // TODO: hook up to s3 bucket. not doing that from a work account
          delete newMessage.experimental_attachments

        }

        if (conversationId) {
          conversation = await prisma.conversation.update({
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
        } else {
          // Create new conversation
          conversation = await prisma.conversation.create({
            data: {
              name: messages[0].content.slice(0, 100),
              userId: 'cm4ahnmzy0000c828xnbacz44',
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
        }
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
