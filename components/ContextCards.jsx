import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemUnsafe,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import FilesDownload from '@/components/FilesDownload'
import DeleteDialog from '@/components/DeleteDialog'
import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons"

export default function ContextCards({ cmessage, cindex, cname, cext }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex z-10 absolute h-full w-full justify-center">
        <div className=" content-center">
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">

        <ContextMenuItem inset disabled={(cmessage ? false : true)} onClick={(e) => e.preventDefault()}>
          <FilesDownload cmessage={cmessage} cindex={cindex} />
          <DownloadIcon />
        </ContextMenuItem>

        <ContextMenuItemUnsafe inset onClick={(e) => e.preventDefault()}>
          <DeleteDialog cname={cname} cext={cext} />
          <TrashIcon />
        </ContextMenuItemUnsafe>

        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}