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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "@radix-ui/react-icons"

import FilesAdd from '@/components/FilesAdd'

export default function AlertDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="whiteAction">
          <div className='flex gap-2'>
            <div className='content-center '>
              <PlusIcon />
            </div>
            <span>Добавить файл</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить файл</DialogTitle>
          <DialogDescription>
            Выберите файл из проводника на своем устройстве, а затем нажмите «Добавить»
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <FilesAdd />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}