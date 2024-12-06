import { Sidebar } from '@/components/Sidebar'
import { Prompt } from '@/components/Prompt'
import { Nav } from '@/components/Nav'
import { Login } from '@/components/Login'
import { auth } from '@/lib/auth'

import { getSidebarConversations } from './chat/actions'

export default async function Home() {
  const conversations = await getSidebarConversations()
  const session = await auth()

  return (
    <div className="container">
      <Sidebar session={session} conversations={conversations} />
      <div className='main-container'
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
