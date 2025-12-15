'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

export default function MobileHomeNav() {
    const [color, setColor] = useState(false)
    const setNavColor = () => {
        if (window.scrollY >= 200) {
            setColor(true)
        }
        else {
            setColor(false)
        }
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('scroll', setNavColor)
        }
    }, [color])
    return (
        <div className={` ${color && 'bg-gradient-to-r from-cyan-500 to-blue-500'} p-3   w-full  `}>
            <div className='flex gap-1 bg-white rounded-2xl'>
                <div className='flex justify-center items-center'>
                    <Button className=' rounded-2xl  bg-white px-1'><Search size={20} color='#52595D' /></Button>
                </div>
                <Input className='outline-0 border-none rounded-2xl  w-full text-gray-700  py-5 placeholder:text-gray-400 placeholder:text-[16px] text-[16px]' placeholder='Enter the product you are looking for ?' />
            </div>
        </div>
    )
}
