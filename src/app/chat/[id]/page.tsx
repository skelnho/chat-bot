import { Sidebar } from '@/components/ui/Sidebar'
import { Header } from '@/components/ui/Header'
import { Prompt } from '@/components/ui/Prompt'

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
      <main className="main">
        <Prompt conversation={conversation} />
      </main>
    </div>
  )
}
