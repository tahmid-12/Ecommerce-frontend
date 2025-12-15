import Link from 'next/link'
import React from 'react'

export default function ShowAll({title, link}) {
  return (
    <section className='flex justify-between items-center py-2 sm:mx-0 mx-3'>
        <p className='lg:text-3xl text-2xl font-bold pt-1'>{title}</p>
        <Link href={link} 
              className='px-4 py-2 border-[1px] border-primary text-md rounded-full transition-all duration-300 
              hover:bg-primary hover:text-white hover:border-transparent'>
                Show All
        </Link>
    </section>
  )
}