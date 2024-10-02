import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import Traceless from '@/components/Traceless'
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { authConfig } from "@/configs/auth"

export default function TracelessDialog({ cmessage, cindex }) {

  const [newowner, setNewOwner] = useState('')
  const [owner, setOwner] = useState('')

  const session = useSession(authConfig);
  useEffect(() => {
    if (session?.data?.user.name) {
      setOwner(session?.data?.user.name);
    }
  }, [session]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='w-full h-full'>Бесследная передача</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Бесследная передача</DialogTitle>
          <DialogDescription><span>
            Эта технология позволяет приватно отправлять файлы другим пользователям системы SAFETHROW. 
          </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <div className="flex flex-row justify-between w-[70%]">
            <div className="content-center">{owner ? owner : "nbd"}</div>
            <div className="content-center animate-pulse"><ArrowRightIcon /></div>
            <Input
              className="w-[50%]"
              id="newowner"
              name="newowner"
              value={newowner}
              onChange={(e) => [setNewOwner(e.target.value)]}
              placeholder="Получатель"
              required
            />
          </div>
        </div>
        <DialogFooter className="">
          <Traceless cmessage={cmessage} cindex={cindex} newowner={newowner} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}