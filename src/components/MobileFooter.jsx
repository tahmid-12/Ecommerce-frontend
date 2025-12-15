'use client'
import { mobileFooterList } from '@/constants'
import Link from 'next/link'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function MobileFooter() {
  const path = usePathname() 
  return (
    <footer className='md:hidden fixed bottom-0 w-full h-16 bg-white flex justify-between items-center gap-4 px-4'>
        {
          mobileFooterList.map(item=>(
            <Link href={item.link} key={item.id}  className={`w-12 h-12  flex flex-col justify-center items-center ${path === item.link? 'bg-primary rounded-full text-white':'text-gray-400'}`}>
              <p className='text-2xl '>{item.icon}</p>
              <p className={`${path === item.link ? 'hidden' :'text-[16px] text-black' }`}>{item.title}</p>
            </Link>
          ))
        }
    </footer>
  )
}
