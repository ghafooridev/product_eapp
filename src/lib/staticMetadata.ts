import { Image } from "@prisma/client";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

type ProductMetaDataProps = {
  title?: string
  description?: string | null,
  keywords?: string[],
  images?: Image[]
}

export function customMetaDataGenerator({
  title = "digital Product title",
  description = "digital Product description",
  keywords = ["digital", "mobile", "laptop", "watch"],
  images = undefined
}: ProductMetaDataProps): Metadata {

  console.log(title)
  return {
    title,
    description,
    keywords,
    manifest: "./manifest.json",
    openGraph: {
      title,
      description,
      type: "website",
      url: `http://localhost:3000/${title}`,
      images
    } as OpenGraph,
    icons: {
      icon: "/favIcon.ico",
      // shortcut: '/favicon-16x16.png',
      // apple: '/apple-touch-icon.png',
      // other: [
      //   {
      //     rel: 'apple-touch-icon-precomposed',
      //     url: '/apple-touch-icon-precomposed.png',
      //   },
      // ],
    },
  };
}