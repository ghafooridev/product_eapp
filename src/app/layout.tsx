import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClerkProvider from "@/providers/clerk";
import { MonitorSmartphone } from "lucide-react";
import { currentUser } from '@clerk/nextjs/server'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Shop",
  description: "digital shop website",
};

export default async function RootLayout({
  children,
  // ads,
  auth,
  cart
}: Readonly<{
  children: React.ReactNode;
  // ads: React.ReactNode;
  auth: React.ReactNode;
  cart: React.ReactNode;
}>) {
  // const isAdmin = await currentUser();

  return (
    // <ClerkProvider>
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <main className="flex flex-col justify-between min-h-screen">
          <header
            className='fixed w-full flex bg-white shadow-md justify-between px-20 h-20 z-40'
          >
            <div className="flex items-center gap-3">
              <MonitorSmartphone />
              <span className="text-2xl font-bold text-gray-800">Digital Shop</span>
            </div>

            <div className="flex items-center gap-6">
              {/* add slot here */}
              {/* {!!isAdmin ? auth : cart} */}
            </div>
          </header>
          <div className='px-20 mt-20' style={{ minHeight: 'calc(100vh - 120px)' }}>
            {children}
          </div>
          {/* <div className="sticky bottom-20 mx-auto flex justify-center">  {ads}</div> */}
          <footer className=" bg-black text-white flex items-center justify-center  h-10">
            <p>&copy; 2025 JSwith Ali. All rights reserved.</p>
          </footer>
        </main>
      </body>
    </html>
    // </ClerkProvider>
  );
}
