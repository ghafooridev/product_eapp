


import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin
  console.log(isAdmin)

  if (!isAdmin) redirect('/')
  return (
    <div>{children}</div>
  )
}

export default DashboardLayout