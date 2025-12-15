'use client'
import { catagories } from '@/constants'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react';


export default function CatagoryLinks({isHovered,id, handleMouseEnter, handleMouseLeave}) {
  
  return (

    <section className='bg-white shadow-5xl rounded-2xl   w-full'>
      <div className='lg:h-[460px] h-[410px] py-3'>
        {catagories.map((item, index) => (
          <div key={item.id}
            onMouseEnter={() => handleMouseEnter(index)}
            // onMouseLeave={handleMouseLeave}
            className={`center cursor-pointer ${isHovered && index == id && "bg-background"}`}>
            <div className='flex items-center gap-2 px-5 '>
              <div className={'p-1 bg-background rounded-full'}>
                <Image src={item.icon} alt={item.title} className='w-5 h-5 ' />
              </div>
              <p className={`lg:text-xl text-[16px] ${isHovered && index === id ? 'text-primary':'text-gray-400'} pt-2`}>{item.title}</p>
            </div>
            {isHovered && index === id && <ChevronRight size={30} color="#F85606" />}
          </div>
        ))}
      </div>

    </section>



  )
}