import { Fashion1 } from '@/assets/images'
import { MobileNav } from '@/components'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default function MyReturn() {
    const btn = 'border-[1px] border-primary rounded-lg bg-transparent hover:bg-transparent text-primary p-3'
    return (
        < >

            <MobileNav title={"My Returns"} link={"/my-account"} />
            <Card className='bg-white rounded-2xl shadow-5xl md:mt-5 mt-16'>
                <CardContent className='mt-5 h-[300px] relative'>
                    <div className='  shadow-3xl '>
                        <div className='border-b-[2px] px-3 py-2 text-md shadow-3xl text-gray-400 bg-gray-200'>
                            <p>Requested on 30 Nov 2023</p>
                            <p>Order <span className='text-primary'>#651084253577960</span></p>
                        </div>
                        <div>
                            <div className='w-full flex text-[16px] mt-5 px-3 py-2'>
                                <div className='flex gap-2 font-bold w-1/3'>
                                    <Image src={Fashion1} alt='fasion' className='w-[80px] h-[80px]' />
                                    <p>Saree combopack Woman</p>
                                </div>
                                <div className='w-1/3 text-center'>
                                    <p>Qty: 1</p>
                                </div>
                                <div className='w-1/3 flex justify-end '>
                                    <div>
                                        <p className='py-2 px-3 rounded-full bg-slate-200'>Returned</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=' flex gap-2 absolute bottom-3'>
                        <Button className={btn}>{'<'}</Button>
                        <Button className={btn}>1</Button>
                        <Button className={btn}>{'>'}</Button>
                    </div>
                </CardContent>
            </Card>

        </>
    )
}
