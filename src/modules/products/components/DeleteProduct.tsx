import { Trash2 } from "lucide-react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui"
import { deleteProduct } from "../services/product"

const DeleteProduct = async (props: { id: string }) => {
  'use server'
  const { id } = props
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" >
          <Trash2 />
        </Button>

      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the product
            and remove your data from our servers.
          </DialogDescription>
          <DialogFooter>
            <form action={deleteProduct} className="flex justify-center gap-2 items-center">
              <input type="hidden" name="id" defaultValue={id || ''} />
              <Button variant="destructive" >
                <Trash2 /> Remove This Product
              </Button>
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteProduct