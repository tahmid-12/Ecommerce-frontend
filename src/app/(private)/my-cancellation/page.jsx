"use client"
import {MobileNav} from '@/components'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import {format} from "date-fns";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useMyOrderQuery} from '@/redux/api/order'

export default function MyCancellationPage() {
    const {data} = useMyOrderQuery()
    
    const btn = 'border-[1px] border-primary rounded-lg bg-transparent hover:bg-transparent text-primary p-3'
    return (
        <>
            <MobileNav title={"My Cancellation"} link={"/my-account"}/>
            <Card className='bg-white rounded-2xl shadow-5xl md:mt-5 mt-16'>
                <CardContent className='mt-5 relative'>
                    <div className={'py-4'}>
                        {data?.filter(d => d.status === "CANCELLED")?.map(item =>
                            <div key={item.id}
                                 className='w-full text-[16px] my-5 items-center bg-slate-100 rounded-md px-2 space-y-2'>
                                <div className={'flex justify-between py-4 my-5 border-b-[1px] border-[#F85606]/40'}>
                                    <div
                                        className='text-[16px] text-gray-600 '>
                                        <p className={'text-sm'}>{item?.createdAt && format(item?.createdAt, "dd-MMM-yyy, h:m aaaa")}</p>
                                        <p>Order #{item?.orderId}</p>
                                    </div>
                                    <button>Manage Order</button>
                                </div>
                                <div
                                    className='flex gap-2 font-bold sm:w-1/4 relative items-center md:w-full justify-between'>
                                    {
                                        item?.carts?.slice(0, 2)?.map((p) => {
                                            return (
                                                <>
                                                    <Image key={p.id}
                                                           src={p?.products?.images ? process.env.NEXT_PUBLIC_IMAGE_API + p?.products?.images[0]?.path : ""}
                                                           alt={p?.products?.name}
                                                           width={100}
                                                           height={100}
                                                           className='w-[80px] h-[80px] object-contain'/>
                                                    <div>
                                                        <p className='block'>{p?.products?.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className='block'>Qty: {p?.quantity}</p>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }

                                    <div className='w-1/4 text-center sm:block hidden'>
                                        <p className='py-2 px-3 rounded-full bg-slate-200'>{item.status}</p>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>

                    <div className='mt-3 flex gap-2 absolute bottom-2'>
                        <Button className={btn}>{'<'}</Button>
                        <Button className={btn}>1</Button>
                        <Button className={btn}>{'>'}</Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
