"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from 'next-auth/react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  const router = useRouter();
  const session = useSession();
  //console.log(session);
  const username = session?.data?.user.name;
  const userimage = session?.data?.user.image;

  return (
    <header className=" z-10 transition-all content-center header absolute w-full h-[70px] bg-black backdrop-blur-xl shadow">
      <div className="px-[50px]">
        <div className="flex text-white content-center justify-center lg:justify-between w-full">
          <a href="/" className="content-center hidden lg:block">
            <Image
              src="/img/safethrow.png"
              width={100}
              height={9}
              alt="LOGO"
            />
          </a>

          {session?.data
            ?
            <div className="flex gap-10">
              <div className="flex">
                <div className="content-center">
                  <Avatar className="w-[30px] h-[30px] text-black" >
                    <AvatarImage src={userimage ? userimage : "../img/defavatar.png"} alt="avatar" />
                    <AvatarFallback>{session?.data?.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <Button variant="link" className="text-sm" onClick={() => { router.push("/profile") }}>{session?.data?.user.name}</Button>
              </div>
              <Button href="api/auth/signin" className="" variant={"ghost"} onClick={() => signOut({ callbackUrl: '/' })} >Выйти</Button>

            </div>
            :
            <div className="flex lg:gap-10 md:gap-10 sm:gap-10 gap-1">
              <Button className="" onClick={() => router.push('/new/signin')} variant={"ghost"} >Войти</Button>
              <Button type="button" onClick={() => router.push('/new/registration')} variant={"outline"} >Создать аккаунт</Button>
            </div>
          }

        </div>
      </div>
    </header>
  )
}