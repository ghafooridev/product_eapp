import { Prisma } from "@prisma/client";

export type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;