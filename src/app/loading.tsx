import { ShoppingCart } from 'lucide-react';

export default function Loading() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <span className="font-bold text-xl">In Progress ...</span>
      <ShoppingCart size={20} className="relative" />
    </div>
  );
}
