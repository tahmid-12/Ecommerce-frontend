'use client'
import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent,DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '../ui/button'
import AddressForm from './AddressForm'
import { Pencil } from 'lucide-react'

export default function AddressDialog({ title, isProfile, isEdit }) {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} className='bg-white'>
      <DialogTrigger asChild>
        <Button className={'hover:bg-[#F85606]/40'}>{isEdit? <Pencil size={16} />:`Add ${title}`}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-full overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
          <div>
            <AddressForm isProfile={isProfile} isEdit={isEdit} onClose={() => setOpen(false)}/>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
