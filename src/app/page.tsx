import { Sidebar } from '@/components/ui/Sidebar'
import { Header } from '../components/ui/Header'
import { Prompt } from '../components/ui/Prompt'
import { Nav } from '../components/Nav'
import { getSidebarConversations } from './chat/actions'

export default async function Home() {
  const conversations = await getSidebarConversations()

  return (
    <div className="container">
      <Sidebar conversations={conversations} />
      <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
        <Nav />
        <main className="main">
          <Header align="center">Talk data to me.</Header>
          <Prompt />
        </main>
      </div>
    </div>
  )
}
