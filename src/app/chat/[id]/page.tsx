import { Sidebar } from '@/components/ui/Sidebar'
import { Header } from '@/components/ui/Header'
import { Prompt } from '@/components/ui/Prompt'
import { Nav } from '@/components/Nav'

import { getConversation, getSidebarConversations } from '../actions'

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const conversation = await getConversation(id)
  const conversations = await getSidebarConversations()

  return (
    <div className="container">
      <Sidebar conversations={conversations} />
      <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
        <Nav />
        <main className="main">
          <Prompt conversation={conversation}/>
        </main>
      </div>
    </div>
  )
}
