'use client'
import React, {useEffect} from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../ui/tabs'
import {Card} from '../ui/card'
import MyWishList from './MyWishList'
import {useGetWishlistQuery, useRemoveFromWishlistMutation} from "@/redux/api/wishlist";

export default function WishList() {
    const {data} = useGetWishlistQuery()
    const [removeFromWishList] = useRemoveFromWishlistMutation()
    return (
        <Tabs defaultValue="wishlist" className="">
            <TabsList className="bg-[#F6F4F4] h-16 w-full flex justify-start px-5 shadow-3xl">
                <div className='grid  grid-cols-3 w-[500px] '>
                    <TabsTrigger value="wishlist"
                                 className='py-3 data-[state=active]:text-black text-md data-[state=active]:bg-transparent data-[state=active]:border-none data-[state=active]:shadow-none'>My
                        Wishlist ({data?.length})</TabsTrigger>
                    <TabsTrigger value="purchases"
                                 className='py-3 data-[state=active]:text-black text-md data-[state=active]:bg-transparent data-[state=active]:border-none data-[state=active]:shadow-none'>Past
                        Purchases (0)</TabsTrigger>
                    <TabsTrigger value="followed"
                                 className='py-3 data-[state=active]:text-black text-md data-[state=active]:bg-transparent data-[state=active]:border-none data-[state=active]:shadow-none'>Followed
                        Stores (0)</TabsTrigger>
                </div>
            </TabsList>
            <TabsContent value="wishlist" className='mt-8'>
                {data?.length !== 0 ? <MyWishList wishList={data} removeFromList={removeFromWishList}/> :
                    <Card className='bg-white border-none shadow-none p-0 h-[300px] centerAll'>
                        <h1 className='text-md font-bold text-gray-400'>Purchases Empty</h1>
                    </Card>}
            </TabsContent>
            <TabsContent value="purchases" className='mt-8'>
                <Card className='bg-white border-none shadow-none p-0 h-[300px] centerAll'>
                    <h1 className='text-md font-bold text-gray-400'>Purchases Empty</h1>
                </Card>
            </TabsContent>
            <TabsContent value="followed" className='mt-8'>
                <Card className='bg-white border-none shadow-none p-0 h-[300px] centerAll'>
                    <h1 className='text-md font-bold text-gray-400'>Followed Empty</h1>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
