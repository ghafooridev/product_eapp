import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function GET() {
  const user = await currentUser();
  const userId = user?.id;

  if (userId) {
    // Fetch cart from database for logged-in users
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return NextResponse.json(cartItems);
  }

  // Return an empty cart for guests (handled via local storage on client)
  return NextResponse.json([]);
}

export async function POST(request: Request) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await request.json();

  const existingCartItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });
  if (existingCartItem) {
    const updatedItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
    return NextResponse.json(updatedItem);
  }

  const newCartItem = await prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity: 1,
    },
  });

  return NextResponse.json(newCartItem);
}

export async function DELETE(request: Request) {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await request.json();

  const existingCartItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (!existingCartItem) {
    return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
  }

  await prisma.cartItem.delete({
    where: { id: existingCartItem.id },
  });

  return NextResponse.json({ message: 'Item removed from cart' });
}
