import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { footerLists } from '@/constants'

export default function Contact() {
    const {findUs } = footerLists
    return (
        <div className='w-[50%] '>
            <h1 className='text-xlg font-bold'>Contact Us</h1>
            <div className='w-full flex justify-end mt-4'>
                <div className='w-[75%]'>
                    <Card className=' rounded-2xl shadow-5xl bg-white'>
                        <CardContent className='py-8 space-y-7  h-[420px]' >
                            <div className='text-center w-[90%] mx-auto shadow-5xl py-10 rounded-2xl'>
                                <h1 className='text-lg text-primary font-bold'>Email Us</h1>
                                <p className='text-md'>darkak@gmail.com</p>
                            </div>
                            <div className='text-center w-[90%] mx-auto shadow-5xl py-10 rounded-2xl'>
                                <h1 className='text-lg text-primary font-bold'>Customer Support</h1>
                                <p className='text-md'>+8801900000000</p>
                            </div>
                        </CardContent>
                        <CardFooter className='centerAll flex-col'>
                            <h1 className='text-lg font-bold text-center'>Our Social Media</h1>
                            <div className='flex gap-4 mt-2'>
                                {findUs.icon.map((item) => (
                                    <Link key={item.id} href={item.link} className='cursor-pointer'>
                                        <Image src={item.icon} alt='item' className='w-8 h-8'/>
                                    </Link>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
