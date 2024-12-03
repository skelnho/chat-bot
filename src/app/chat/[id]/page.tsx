import { Sidebar } from '@/components/ui/Sidebar'
import { TextInput } from '@/components/ui/TextInput'
import { Conversation } from './Conversation'

export default async function Chat({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <div className="container">
      <Sidebar />
      <main className="main bottom">
        <Conversation />
        <TextInput />
      </main>
    </div>
  )
}
