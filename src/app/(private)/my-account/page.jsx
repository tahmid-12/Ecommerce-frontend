'use client'
import { MobileNav } from '@/components'
import { Card, CardContent } from '@/components/ui/card'
import CardHeaderSection from '@/components/user/CardHeaderSection'
import { accountLink } from '@/constants'
import { useGetCurrentUserQuery } from "@/redux/api/currentUser"
import { useRouter } from 'next/navigation'
import { FaAngleRight } from "react-icons/fa6"

export default function ProfilePage() {
    const navigate = useRouter()
    const {data} = useGetCurrentUserQuery()
    return (
        <main className=' bg-slate-00'>
            {/* web view section */}
            <section className='md:block hidden'>
                <h1 className='text-3xl font-bold'>My Account</h1>
                <div className='md:flex  gap-3 mt-9'>
                    {/* Personal Profile */}
                    <Card className='bg-white rounded-2xl w-1/3 h-[300px] shadow-5xl'>
                        <CardHeaderSection title={'Personal Profile'}/>
                        <CardContent className='-mt-3'>
                            <div className='pl-4'>
                                <p className='text-[16px]'>{data?.user?.name}</p>
                                <p className='text-[16px]'>{data?.user?.email}</p>
                                <p className='text-[16px]'>{data?.user?.mobile}</p>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Address Book */}
                    <Card className='bg-white rounded-2xl w-1/3 h-[300px] shadow-5xl'>
                        <CardHeaderSection title={'Address Book'}/>
                        <CardContent className='-mt-3'>
                            <div className='pl-4 text-[16px] space-y-1'>
                                <p className=' text-gray-500'>DEFAULT DELIVERY ADDRESS</p>
                                <p className='font-bold'> {data?.user?.name}</p>
                                {data?.user?.shippingAddress ? (
                                    <>
                                        <p>{data?.user?.shippingAddress?.area}</p>
                                        <p>{data?.user?.shippingAddress?.state} - {data?.user?.shippingAddress?.city} - {data?.user?.shippingAddress?.address}</p>
                                        <p>{data?.user?.shippingAddress?.mobile}</p></>
                                ) : "Add Default Delivery Address   "}
                            </div>
                        </CardContent>
                    </Card>
                    {/* DEFAULT DELIVERY ADDRESS */}
                    <Card className='bg-white rounded-2xl w-1/3 h-[300px] shadow-5xl'>
                        <CardHeaderSection title={'DEFAULT DELIVERY ADDRESS'} isDelivery={true}/>
                        <CardContent className='-mt-3'>
                            <div className='pl-4 text-[16px] space-y-1'>
                                <p className=' text-gray-500'>DEFAULT DELIVERY ADDRESS</p>
                                <p className='font-bold'> {data?.user?.name}</p>
                                {data?.user?.shippingAddress ? (
                                    <>
                                        <p>{data?.user?.shippingAddress?.area}</p>
                                        <p>{data?.user?.shippingAddress?.state} - {data?.user?.shippingAddress?.city} - {data?.user?.shippingAddress?.address}</p>
                                        <p>{data?.user?.shippingAddress?.mobile}</p></>
                                ) : "Add Default Delivery Address   "}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* mobile section */}
            <section className='md:hidden block'>
                <MobileNav title={'My Account'}/>
                <div className='mt-14'>
                    <h3 className='px-4 py-2 text-xl font-bold'>Hello, Saymon</h3>
                    <div>
                        {accountLink.map(item => (
                            <div onClick={() => navigate.push(item.link)} key={item.id}
                                 className='bg-white p-5 border-b-[1px] text-xl cursor-pointer'>
                                <div className='flex justify-between'>
                                    <div className='flex gap-3'>
                                        <span className='text-xl'>{item.icon}</span>
                                        <h1>{item.title}</h1>
                                    </div>
                                    <span><FaAngleRight/></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </main>
    )
}
