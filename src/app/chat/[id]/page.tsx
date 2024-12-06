import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar'
import { Prompt } from '@/components/Prompt'
import { Nav } from '@/components/Nav'
import { Login } from '@/components/Login'
import { auth } from '@/lib/auth'

import { getConversation, getSidebarConversations } from '../actions'

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/')
  }

  const id = (await params).id
  const conversation = await getConversation(id)
  const conversations = await getSidebarConversations()

  return (
    <div className="container">
      <Sidebar conversations={conversations} session={session} />
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <Nav>
          <Login session={session} />
        </Nav>
        <main className="main">
          <Prompt conversation={conversation} />
        </main>
      </div>
    </div>
  )
}
