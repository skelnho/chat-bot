import { ChatBox } from '@/components/ChatBox'
import { Sidebar } from '@/components/ui/Sidebar'

export default function Home() {
  return (
    <div className='container'>
      <main className='main'>
        <Sidebar />
        <ChatBox />
      </main>
    </div>
  )
}
