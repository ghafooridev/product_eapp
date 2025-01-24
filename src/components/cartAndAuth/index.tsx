import { Badge } from '@/components/ui';

import { ShoppingCart } from 'lucide-react';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import AdminMenu from './AdminMenu';


async function CartAndAuth() {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin

  return (
    <div className='flex items-center gap-2'>
      <div className="relative mx-4">
        <Badge className="absolute bottom-4 right-2  rounded-full w-5 h-5 flex items-center justify-center">4</Badge>
        <ShoppingCart size={20} className="relative" />
      </div>

      <div>
        <SignedIn>
          {isAdmin ? <AdminMenu /> : <UserButton />}
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  )
}

export default CartAndAuth