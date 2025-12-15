import { Card } from '@/components/ui/card'
import WishList from '@/components/wishlist/WishList'
import React from 'react'

export default function WishListPage() {
    return (
        <main className='mb-10'>
            <h1 className='text-3xl font-bold'>My Wishlist & Followed Stores</h1>
            <Card className='bg-white rounded-2xl  shadow-5xl mt-9 p-5'>
                <WishList/>
            </Card>
        </main>
    )
}
