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
                <AvatarImage src={userimage ? userimage : "../img/defavatar.png"} alt="avatar" />
                <AvatarFallback>{session?.data?.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <Separator className="bg-black/10 mt-2" />
          <div className='flex gap-1 md:gap-3 p-[10px] transition-all justify-center'>
            <Button className={(value == 1) ? "text-xs md:text-sm bg-accent text-white" : "text-xs md:text-sm"} onClick={() => setValue(1)} variant='ighost'>Личные данные</Button>
            <Button className={(value == 2) ? "text-xs md:text-sm bg-accent text-white" : "text-xs md:text-sm"} onClick={() => setValue(2)} variant='ighost'>Проводник</Button>
            <Button className={(value == 3) ? "text-xs md:text-sm bg-accent text-white" : "text-xs md:text-sm"} onClick={() => setValue(3)} variant='ighost'>Настройки</Button>
          </div>
        </div>
      </div>

      {value == 2 && (
        <FilesBar />
      )}



    </div>
  )
}
// <div>
//   <h1>Profile of {session?.user?.name}</h1>
//   {session?.user?.image && <img src={session?.user?.image} />}
// </div>