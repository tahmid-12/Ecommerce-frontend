'use client'
import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { StarFull } from '@/assets/images'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getDiscountPercentage } from "@/lib/utils";

export default function CardItem({ item, isCatagories, isFlash }) {
    const route = useRouter()
    const handleClicked = (e, itemId) => {
        e.stopPropagation();
        if (isCatagories) {
            route.push(`/products`)
        } else {
            route.push(`/products/${itemId}`)
        }
    }

    let percentage = getDiscountPercentage(item?.offer_price, item?.regular_price)
    const productLink = isCatagories ? `/products` : `/products/${item.id}`

    return (
        <Link href={productLink} passHref>
            <Card className={`border-none rounded-2xl hover:shadow-5xl cursor-pointer ${!isCatagories && 'min-h-[350px]'}`}>
                <CardContent className='p-0 text-md'>
                    <div onClick={(event) => handleClicked(event, item.id)}>
                        <div className='relative '>
                            <div className={'bg-white rounded-t-2xl'}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_API}${isCatagories ? item?.image?.path : item?.images[0]?.path}`}
                                    alt={item?.name}
                                    className={`${!isCatagories ? 'h-48' : 'h-32'} rounded-t-2xl  w-full object-contain`}
                                    width={300} height={100} />
                            </div>
                            {!isCatagories && <div
                                className='absolute top-2 left-2 bg-primary h-6 w-10 rounded-full flex justify-center items-start'>
                                <p className='text-white text-[16px]'>{percentage}%</p>
                            </div>}
                        </div>
                        <div className='py-3 px-2 '>
                            <div className=''>
                                {/* {item?.name} */}
                                {item?.name?.length > 30 ? `${item.name.slice(0, 35)}...` : item?.name}
                            </div>
                            {/* check  it catagory section or not*/}
                            {!isCatagories &&
                                <div>
                                    {<div className='flex gap-3'>
                                        <p className='text-primary'>${item?.offer_price}</p>
                                        <p className='text-gray-400'>${item?.regular_price}</p>
                                    </div>}
                                    {/* check flash section or not */}
                                    {!isFlash && <div className='flex gap-3 items-center'>
                                        <div className='flex '>
                                            <Image src={StarFull} alt='star' className='w-4 h-4' />
                                            <Image src={StarFull} alt='star' className='w-4 h-4' />
                                            <Image src={StarFull} alt='star' className='w-4 h-4' />
                                            <Image src={StarFull} alt='star' className='w-4 h-4' />
                                            <Image src={StarFull} alt='star' className='w-4 h-4' />
                                        </div>
                                        <p className='text-[16px] pt-1'>{item?.review || '200'}</p>
                                    </div>}
                                </div>
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}