import { features } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Features() {
  return (

    <section className='sm:grid hidden xl:grid-cols-9 lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-5 grid-cols-4 gap-3 xl:justify-between  bg-light rounded-2xl mb-5 p-4'>
      {features.map(item => (
        <Link href={'/products'} key={item.id} className='flex flex-col items-center'>
          <Image src={item.img} alt={item.title} className='w-32' />
          <div className='flex justify-center w-32 h-14 mt-3'>
            <p className='text-md text-center'>{item.title}</p>
          </div>
        </Link>
      ))}
    </section>
  )
}
