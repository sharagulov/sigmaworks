'use client'
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  return (
    <div className="w-screen ">
      <Header />
      <div className="flex h-screen justify-center">
        <div className="content-center">
          <div className=" p-[20px] backdrop-blur-lg rounded-xl shadow-xl text-center">

          <p className="text-accent">Аккаунт успешно создан.</p>
          <p className="">Войдите в систему, используя новые данные.</p>
          <Separator className="bg-black/10 mt-2"/>
          <Button className="mt-3" onClick={() => {router.push('/new/signin')}}>Войти</Button>
          </div>
        </div>
      </div>
    </div>
  )
}