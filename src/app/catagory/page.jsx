'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs'
import Image from 'next/image'
import { GoPersonFill } from "react-icons/go";

import React, { useState } from 'react'
import { Cloth2, Tshirt } from '@/assets/images'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MobileNav } from '@/components'

const tabsList = [
    {
        id: 1,
        title: 'Just For You',
        value: "just_for_you"
    },
    {
        id: 2,
        title: 'Ear pod Pro',
        value: "ear_pad_pro"
    },
    {
        id: 3,
        title: 'Gaming Pod',
        value: ""
    },
    {
        id: 4,
        title: 'Head Phone',
        value: ""
    },
    {
        id: 5,
        title: 'LED Monitor',
        value: ""
    },
    {
        id: 6,
        title: 'Mouse',
        value: ""
    },
    {
        id: 7,
        title: 'Mobile',
        value: ""
    },
    {
        id: 8,
        title: 'Printer',
        value: ""
    },

]

export default function Catagory() {
    const [title, setTitle] = useState('Just For You')

    const trigger = `data-[state=active]:bg-white w-full`
    return (
        <>
            <MobileNav title={title} isSearch={true} isCart={true} isDot={true}/>
            <section className='md:hidden mt-16'>
                <Tabs defaultValue={tabsList[0].value} className="">
                    <div className='flex gap-2 '>
                        <TabsList className="flex flex-col w-[100px] h-full gap-2">
                            {tabsList.map(item => (
                                <div key={item.id} className={trigger} onClick={()=>setTitle(item.title)}>
                                    <TabsTrigger value={item.value} className={`flex flex-col w-full`}>
                                        <p><GoPersonFill className='text-2xl' /></p>
                                        {item.title}
                                    </TabsTrigger>
                                </div>
                            ))}



                        </TabsList>
                        <div className='w-full  m-0  border-[2px] p-2'>
                            <TabsContent value="just_for_you" className='w-full m-0 grid grid-cols-3 gap-2'>
                                <div className='text-center '>
                                    <Image src={Cloth2} alt={''} className=' h-20 ' />
                                    <p>Cloth2</p>
                                </div>
                                <div className='text-center '>
                                    <Image src={Cloth2} alt={''} className=' h-20 ' />
                                    <p>Cloth2</p>
                                </div>
                                <div className='text-center '>
                                    <Image src={Cloth2} alt={''} className=' h-20 ' />
                                    <p>Cloth2</p>
                                </div>
                                <div className='text-center '>
                                    <Image src={Cloth2} alt={''} className=' h-20 ' />
                                    <p>Cloth2</p>
                                </div>
                                <div className='text-center '>
                                    <Image src={Cloth2} alt={''} className=' h-20 ' />
                                    <p>Cloth2</p>
                                </div>
                                <div className='text-center '>
                                    <Image src={Cloth2} alt={''} className=' h-20 ' />
                                    <p>Cloth2</p>
                                </div>
                                <div className='text-center '>
                                    <Image src={Cloth2} alt={''} className=' h-20 ' />
                                    <p>Cloth2</p>
                                </div>

                            </TabsContent>
                            <TabsContent value="ear_pad_pro" className='w-full m-0'>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Traditional Wear</AccordionTrigger>
                                        <AccordionContent className='w-full m-0 px-3 grid grid-cols-3 gap-2'>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Traditional Wear</AccordionTrigger>
                                        <AccordionContent className='w-full m-0 px-3 grid grid-cols-3 gap-2'>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Traditional Wear</AccordionTrigger>
                                        <AccordionContent className='w-full m-0 px-3 grid grid-cols-3 gap-2'>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                            <div className='text-center '>
                                                <Image src={Cloth2} alt={''} className=' h-20 ' />
                                                <p>Cloth2</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </section>
        </>
    )
}
