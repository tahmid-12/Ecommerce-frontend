"use client"

import {MobileNav} from '@/components'
import AddressDialog from '@/components/AddressBook/AddressDialog'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

import React, {Suspense} from 'react'
import {Trash2} from 'lucide-react'
import {useDeleteAddressMutation, useGetAddressQuery, useUpdateAddressMutation} from "@/redux/api/address";
import {Skeleton} from "@/components/ui/skeleton";

export default function AddressBookPage() {
    const {data, isLoading} = useGetAddressQuery()
    const [deleteAddress] = useDeleteAddressMutation()

    return (
        <main className=' mb-10'>
            {/* <h1 className='text-3xl font-bold'>Address Book</h1> */}
            <MobileNav title={'Address Book'} link={'/my-account'}/>
            <Tabs defaultValue="delivery" className='md:mt-0 mt-16'>


                <TabsContent value="delivery">
                    <div className='bg-white rounded-2xl  shadow-5xl  p-5 space-y-3'>
                        <AddressDialog title={'New Address'} isProfile={false}/>
                        <div className={'grid grid-cols-2 gap-4'}>
                            {
                                isLoading ?
                                    Array.from({length: 2}).map((i) => {

                                        return (
                                            <Skeleton key={i} isFeatured={false}/>
                                        )
                                    })
                                    : data?.map((address) => {

                                        return (
                                            <Card key={address.id}>
                                                <CardHeader>
                                                    <div className='center'>
                                                        <CardTitle
                                                            className={`text-lg`}>{address?.user?.name}</CardTitle>
                                                        <div className='center'>
                                                            <AddressDialog title={'Delivery Address'} isEdit={address}/>
                                                            <Button className='hover:bg-[#F85606]/40   w-[40%]'
                                                                    onClick={() => deleteAddress(address.id)}><Trash2
                                                                size={40}/></Button>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className='text-md space-y-2'>
                                                    <p className={'text-[16px]'}>{address?.mobile}</p>
                                                    <p className={'text-[16px]'}>{address?.state} - {address?.state} - {address?.address}</p>

                                                    <div className='flex gap-2 items-center text-md'>
                                                        <p className={'bg-white border-[1px] border-slate-300 rounded-md px-2 text-sm py-1'}>{address?.type}</p>
                                                        {
                                                            address?.billingAddress ?
                                                                <p className={'bg-white border-[1px] border-slate-300 rounded-md px-2 text-sm py-1'}>Default
                                                                    Billing Address</p> : ""
                                                        }
                                                        {
                                                            address?.shippingAddress ?
                                                                <p className={'bg-white border-[1px] border-slate-300 rounded-md px-2 text-sm py-1'}>Default
                                                                    Delivery Address</p> : ""
                                                        }
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </TabsContent>

            </Tabs>

        </main>
    )
}
