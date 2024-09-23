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

import FilesDelete from '@/components/FilesDelete'

export default function DeleteDialog({ cname, cext }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='w-full h-full'>Удалить</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Удалить файл</DialogTitle>
          <DialogDescription>
            Вы действительно хотите безвозвратно удалить файл? Доступ к нему невозможно восстановить.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <FilesDelete cname={cname} cext={cext}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}