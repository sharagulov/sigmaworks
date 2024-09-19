"use client"
import { Button } from "@/components/ui/button"
import Header from "../../components/Header"
import { authConfig } from '@/configs/auth'

import { useSession } from 'next-auth/react'
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import FilesBar from "@/components/FilesBar"


export default function Profile() {
  const session = useSession(authConfig)
  const [value, setValue] = useState(2);
  const username = session?.data?.user.name;
  const userimage = session?.data?.user.image;

  return (
    <div className="w-screen h-screen" >
      <Header />
      <div className="flex gap-10 w-full justify-center">
        <div className=" mt-[90px]  shadow-xl transition-all rounded-[30px] z-2 px-[8px]">
          <div className="flex gap-3 mt-3 justify-center">
            <div className="text-center text-lg">{username}</div>
            <div className="content-center">
              <Avatar className="w-[30px] h-[30px]" >
                <AvatarImage src={session?.data?.user.image ? session?.data?.user.image : ""} alt="avatar" />
                <AvatarFallback>{session?.data?.user.name}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <Separator className="bg-black/10 mt-2" />
          <div className='flex gap-3 p-[10px] transition-all justify-center'>
            <Button className={(value == 1) ? "bg-accent text-white" : ""} onClick={() => setValue(1)} variant='ighost'>Личные данные</Button>
            <Button className={(value == 2) ? "bg-accent text-white" : ""} onClick={() => setValue(2)} variant='ighost'>Проводник</Button>
            <Button className={(value == 3) ? "bg-accent text-white" : ""} onClick={() => setValue(3)} variant='ighost'>Настройки</Button>
          </div>
        </div>
      </div>

      {value == 2 && (
        <FilesBar/>
      )}



    </div>
  )
}
// <div>
//   <h1>Profile of {session?.user?.name}</h1>
//   {session?.user?.image && <img src={session?.user?.image} />}
// </div>