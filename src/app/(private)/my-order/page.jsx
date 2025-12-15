"use client"

import {MobileNav} from '@/components'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from '@/components/ui/select'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import Image from 'next/image'

import React, {useEffect, useState} from 'react'
import {useMyOrderQuery, useUpdateOrderMutation} from "@/redux/api/order";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {format} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import CustomButton from "@/components/CustomButton";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {Loader} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";


export default function MyOrderPage() {

    const [itemToPay, setToPay] = useState([])
    const [itemToShipped, setItemToShipped] = useState([])
    const [itemToReceive, setItemToReceive] = useState([])

    const {data, isLoading} = useMyOrderQuery()

    console.log("useMyOrderQuery() for data", data);

    useEffect(() => {
        if (data) {
            const toPay = data?.filter(d => {
                return d?.payment?.paymentStatus === "UNPAID" && d.status !== "CANCELLED"
            })

            const toShip = data?.filter(d => d?.status !== "DELIVERED" && d?.status !== "SHIPPED" && d?.status !== "CANCELLED")

            const toReceive = data?.filter(d => d?.status !== "RECEIVED" && d?.status !== "CANCELLED")

            if (toShip?.length) {
                setItemToShipped(toShip)
            }

            if (toReceive?.length) {
                setItemToReceive(toReceive)
            }

            if (toPay?.length) {
                setToPay(toPay)
            }
        }
    }, [data]);

    const tabTrigger = 'pb-0 data-[state=active]:border-b-[3px] data-[state=active]:bg-transparent rounded-none  data-[state=active]:border-primary text-xl'


    return (<>
        <MobileNav title={"My Order"} link={"/my-account"}/>
        <section className='bg-white rounded-2xl shadow-5xl md:mt-5 mt-16 mb-10'>
            <CardContent>
                <Tabs defaultValue="all" className='w-full'>
                    <TabsList
                        className="grid grid-cols-4 bg-transparent w-full border-b-[3px] h-[40px] rounded-none   border-[#F85606]/40 ">
                        <div className=' w-full flex'>
                            <TabsTrigger value="all" className={tabTrigger}>All</TabsTrigger>
                            <TabsTrigger value="toPay" className={tabTrigger}>To
                                pay({itemToPay?.length})</TabsTrigger>
                            <TabsTrigger value="toShip" className={tabTrigger}>To Ship
                                ({itemToShipped?.length})</TabsTrigger>
                            <TabsTrigger value="toReceive" className={tabTrigger}>To Receive
                                ({itemToReceive?.length})</TabsTrigger>
                        </div>
                    </TabsList>
                    <OrderContent tag={'all'} data={data} isLoading={isLoading}/>
                    <OrderContent tag={'toPay'} data={itemToPay} isLoading={isLoading}/>
                    <OrderContent tag={'toShip'} data={itemToShipped} isLoading={isLoading}/>
                    <OrderContent tag={'toReceive'} data={itemToReceive} isLoading={isLoading}/>
                </Tabs>
            </CardContent>
        </section>

    </>)
}


const OrderContent = ({tag, data, isLoading = true}) => {
    const [open, setOpen] = useState(false)
    return (<TabsContent value={tag}>
        <Card className={'bg-white border-none shadow-none w-full'}>
            <CardContent className="p-0">
                {data?.length >= 5 && <div className=' mt-3 shadow-3xl rounded-2xl'>
                    <div className='center py-3 w-[90%] mx-auto'>
                        <div className='flex gap-4 items-center '>
                            <p className='text-md md:block hidden'>Show:</p>
                            <div>
                                <Select>
                                    <SelectTrigger
                                        className="w-[180px] bg-transparent px-5 border-[1px] border-primary rounded-full py-2">
                                        <SelectValue placeholder="Last 5 Orders"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Products</SelectLabel>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="15">15</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Button className='hover:bg-[#F85606]/40 text-[16px] rounded-full'>Pay
                                Now</Button>
                        </div>
                    </div>
                </div>}

                <div>
                    {data ? [...data]?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map(item => {
                        const products = item?.cartItem?.products
                        return (<div key={item.id}
                                     className='w-full text-[16px] my-5 items-center bg-slate-100 rounded-md px-2 space-y-2'>
                            <div
                                className={'flex justify-between py-4 my-5 border-b-[1px] border-[#F85606]/40'}>
                                <div
                                    className='text-[16px] text-gray-600 '>
                                    <p>Order #{item?.orderId}</p>
                                    <p className={'text-sm'}>{item?.createdAt && format(item?.createdAt, "dd-MMM-yyy, h:m aaaa")}</p>
                                </div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button>Manage Order</button>
                                    </PopoverTrigger>
                                    <PopoverContent className={'w-fit px-4 py-3 flex flex-col space-y-2'}>
                                        <button
                                            onClick={() => setOpen(true)}
                                            className={'bg-gray-300 text-sm font-semibold rounded-md px-3 py-1'}>Cancel
                                            Order
                                        </button>

                                        <button
                                            className={'bg-gray-300 text-sm font-semibold rounded-md px-3 py-1'}>Track
                                            Your Order
                                        </button>
                                    </PopoverContent>
                                </Popover>
                                <ConfirmCancelOrder id={item?.id} open={open} setOpen={setOpen}/>
                            </div>
                            <div
                                className='flex gap-16 font-bold sm:w-1/4 relative items-center md:w-full justify-between'>
                                <div className={'flex flex-col flex-1'}>
                                    {

                                        products ? (<div key={products.id}
                                                         className={'flex items-center w-full justify-between py-4'}>
                                            <Image
                                                src={products?.images ? process.env.NEXT_PUBLIC_IMAGE_API + products?.images[0]?.path : ""}
                                                alt={products?.name}
                                                width={100}
                                                height={100}
                                                className='w-[80px] h-[80px] object-contain rounded-md'/>
                                            <div>
                                                <p className='block'>{products?.name}</p>
                                            </div>
                                            <div>
                                                <p className='block'>Qty: {item?.cartItem?.quantity}</p>
                                            </div>
                                        </div>) : null}
                                </div>

                                <div className='w-1/4 text-center sm:block hidden'>
                                    <p className='py-2 px-3 rounded-full bg-slate-200'>{item.status}</p>
                                </div>

                            </div>
                        </div>)
                    }) : isLoading ? <Skeleton/> : <p>No Order Found</p>}


                </div>
            </CardContent>

        </Card>
    </TabsContent>)
}

const schema = z.object({
    cancellationReason: z.string().min(10, "Please enter a reason"), status: z.string().default("CANCELLED")
})

const ConfirmCancelOrder = ({open, setOpen, id}) => {
    const [updateOrder] = useUpdateOrderMutation()
    const form = useForm({
        defaultValues: {
            status: "CANCELLED", comment: ""
        }, resolver: zodResolver(schema)
    })
    return (<Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure, you want to cancel this order?</DialogTitle>
                <DialogDescription>
                    This action will cancel your order, Cancelling multiple order will be added blacklist to you
                </DialogDescription>
                <Form {...form}>
                    <form
                        className={'space-y-4'}
                        onSubmit={form.handleSubmit(data => {
                            updateOrder({id, ...data})
                            setOpen(false)
                        })}>
                        <FormField
                            render={({field}) => (<FormItem>
                                <FormLabel>Reason</FormLabel>
                                <FormControl><Textarea className={'rounded-md focus:outline-0 px-2'} {...field}
                                                       placeholder={"I want to add more items in my next order"}/></FormControl>
                                <FormMessage/>
                            </FormItem>)}
                            name={'comment'}
                            control={form.control}
                        />

                        <div className={'flex justify-between'}>
                            <CustomButton style={'bg-gray-600 hover:bg-gray-700'} type={'button'}
                                          click={() => setOpen(false)} title={'Close'}/>
                            <CustomButton type={'submit'} title={'Continue'}/>
                        </div>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    </Dialog>)
}