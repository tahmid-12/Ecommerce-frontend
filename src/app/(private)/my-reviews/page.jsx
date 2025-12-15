
import { MobileNav } from '@/components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import React from 'react'

export default function MyReviews() {
    return (
        <>
            <MobileNav title={"My Cancellation"} link={"/my-account"} />
            <Tabs defaultValue="account" className='md:mt-5 mt-16'>
                <TabsList className=" bg-white w-full flex justify-start h-12">
                    <div className="w-[400px] grid  grid-cols-2">
                        <TabsTrigger value="account" className='data-[state=active]:text-primary text-md  data-[state=active]:border-none data-[state=active]:shadow-none'>Reviews</TabsTrigger>
                        <TabsTrigger value="password" className='data-[state=active]:text-primary text-md  data-[state=active]:border-none data-[state=active]:shadow-none'>History</TabsTrigger>
                    </div>
                </TabsList>
                <TabsContent value="account" >
                    <div className='h-[350px] centerAll bg-white'>
                        <Link href={'/'} className='text-3xl text-primary'>Go to HomePage</Link>
                    </div>
                </TabsContent>
                <TabsContent value="password">
                    <div className='h-[350px] centerAll bg-white'>
                        <Link href={'/'} className='text-3xl text-primary'>Go to HomePage</Link>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}
