"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const router = useRouter();
  const session = useSession();
  console.log(session);

  return (
    <header className=" transition-all content-center header absolute w-full h-[70px] bg-black backdrop-blur-xl rounded-lg shadow">
      <div className="px-[50px]">
        <div className="flex text-white content-center justify-between w-full">
          <div className="content-center">
            <Image
              src="/img/safethrow.png"
              width={100}
              height={9}
              alt="LOGO"
            />
          </div>

          {session?.data
            ?
            <div className="flex gap-10">
              <Button variant="link" className="text-sm" onClick={() => {router.push("/profile")}}>{session?.data?.user.name}</Button>
              <Button href="api/auth/signin" className="" variant={"ghost"} onClick={() => signOut({ callbackUrl: '/new' })} >Выйти</Button>
            </div>
            :
            <div className="flex gap-10">
              <Button className="" onClick={() => router.push('/new/signin')} variant={"ghost"} >Войти</Button>
              <Button type="button" onClick={() => router.push('/new/registration')} variant={"outline"} >Создать аккаунт</Button>
            </div>
          }

        </div>
      </div>
    </header>
  )
}