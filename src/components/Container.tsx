import React, { FC, ReactNode } from 'react'

import { MonitorSmartphone } from 'lucide-react';


const Container: FC<{ children: ReactNode, auth?: ReactNode, cart?: ReactNode }> = ({ children, auth, cart }) => {
  // const isAdmin=checkuser()
  const isAdmin = false
  return (
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
          {isAdmin ? auth : cart}
        </div>
      </header>
      <div className='px-20 mt-20' style={{ minHeight: 'calc(100vh - 120px)' }}>
        {children}
      </div>
      <footer className=" bg-black text-white flex items-center justify-center  h-10">
        <p>&copy; 2025 JSwith Ali. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default Container