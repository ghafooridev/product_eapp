import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { promises as fs } from 'fs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const productId = formData.get("productId") as string;

    if (!file || !productId) {
      return NextResponse.json({ error: "Missing file or productId" }, { status: 400 });
    }

    // Read the file data as a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the directory exists
    const uploadDir = path.join(process.cwd(), "public/assets", productId);
    await mkdir(uploadDir, { recursive: true });

    // Define the file path
    const filePath = path.join(uploadDir, file.name);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Construct the public URL
    const fileUrl = `/assets/${productId}/${file.name}`;

    // Update the database using Prisma
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        images: {
          create: { image: fileUrl },
        },
      },
      include: { images: true },
    });

    return NextResponse.json({ message: "File uploaded successfully", data: updatedProduct?.images });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  try {
    const images = await prisma.image.findMany({
      where: { productId },
    });

    if (!images.length) {
      return NextResponse.json(
        { error: "No images found for this product" },
        { status: 404 }
      );
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const imageId = searchParams.get("imageId");

    if (!imageId) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    // Get the image details from the database
    const image = await prisma.image.findUnique({
      where: { id: imageId },
      include: { Product: true }, // To get productId for constructing path
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    if (!image.image || !image.Product?.id) {
      return NextResponse.json({ error: "Invalid image data" }, { status: 400 });
    }

    // Construct the file path from stored URL
    const imagePath = path.join(process.cwd(), 'public', image.image);

    // Remove the image file from the filesystem
    try {
      await fs.unlink(imagePath);
      console.log(`Deleted file: ${imagePath}`);
    } catch (fileError) {
      console.error(`Error deleting file ${imagePath}:`, fileError);
      return NextResponse.json({ error: "File deletion failed" }, { status: 500 });
    }

    // Delete the image record from the database
    await prisma.image.delete({ where: { id: imageId } });

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}