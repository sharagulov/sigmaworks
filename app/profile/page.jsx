import { getServerSession } from 'next-auth/next'
import Header from "../../components/Header"
import { authConfig } from '@/configs/auth'

export default async function Profile() {
  const session = await getServerSession(authConfig)
  return (
    <div className="w-screen h-screen" >
      <Header/>
      <div>
        <h1>Profile of {session?.user?.name}</h1>
        {session?.user?.image && <img src={session?.user?.image} />}
      </div>

    </div>
  )
}