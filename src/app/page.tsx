import { TextInput } from '@/components/ui/TextInput'
import { Sidebar } from '@/components/ui/Sidebar'
import { Header } from '../components/ui/Header'

export default function Home() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Header align="center">What can I help with?</Header>
        <TextInput />
      </main>
    </div>
  )
}
