import { Sidebar } from '@/components/ui/Sidebar'
import { Header } from '../components/ui/Header'
import { Prompt } from '../components/ui/Prompt'
import { Nav } from '../components/Nav'
import { Login } from '../components/Login'
import { getSidebarConversations } from './chat/actions'
import { auth } from '@/lib/auth'

export default async function Home() {
  const conversations = await getSidebarConversations()
  const session = await auth()

  return (
    <div className="container">
      <Sidebar session={session} conversations={conversations} />
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
          <Prompt />
        </main>
      </div>
    </div>
  )
}
