import { Sidebar } from '@/components/ui/Sidebar'
import { Header } from '../components/ui/Header'
import { Prompt } from '../components/ui/Prompt'
import { getSidebarConversations } from './chat/actions'

export default async function Home() {
  const conversations = await getSidebarConversations()
  return (
    <div className="container">
      <Sidebar conversations={conversations} />
      <main className="main">
        <Header align="center">What can I help with?</Header>
        <Prompt />
      </main>
    </div>
  )
}
