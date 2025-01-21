import { Badge, Button } from '@/components/ui';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

function Cart() {
  return (
    <div>
      <div className="relative">
        <Badge className="absolute bottom-3 left-3  rounded-full w-5 h-5 flex items-center justify-center">4</Badge>
        <ShoppingCart size={20} className="relative" />
      </div>
      <Button asChild>
        <Link href="/dashboard/products">
          Go To Dashboard
        </Link>

      </Button>
    </div>
  )
}

export default Cart