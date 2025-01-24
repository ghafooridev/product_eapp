
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

    <div>
      <SignedIn>
        {isAdmin ? <AdminMenu /> : <UserButton />}
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>

  )
}

export default CartAndAuth