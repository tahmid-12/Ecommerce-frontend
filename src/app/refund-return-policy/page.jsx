import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default function RefundReturnPolicy() {
    return (
        <div className='my-16'>
            <Tabs defaultValue="returns-Policy" className="">
                <TabsList className="grid w-full grid-cols-2 bg-white p-0">
                    <TabsTrigger value="returns-Policy">Returns Policy</TabsTrigger>
                    <TabsTrigger value="refund-Policy">Refund Policy</TabsTrigger>
                </TabsList>
                <TabsContent value="returns-Policy">
                    <Card className='text-md bg-white p-4'>
                        <h1 className='my-2 font-bold'>Returns Policy</h1>
                        <div className='pl-3'>
                            <p>* If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Darkar app or website. Return request must be raised within 14 days for DarkarMall items, or within 7 days for non-DarkarMall items from the date of delivery.</p>
                            <p>* For electronic appliances & mobile phones related issues after usage or after the return policy period, please check if the product is covered under seller warranty or brand warranty. For more information on warranty claims.</p>
                            <p>* For selected categories, we accept a change of mind. Please refer to the section below on Return Policy per Category for more information.</p>
                        </div>
                        <h1 className='my-2 font-bold'>Valid reasons to return an item</h1>
                        <div className='pl-3'>
                            <p>* Delivered product is damaged (i.e. physically destroyed or broken) / defective (e.g. unable to switch on)more information.</p>
                            <p>* Delivered product is incomplete (i.e. has missing items and/or accessories)</p>
                            <p>* Delivered product is incorrect (i.e. wrong product/size/colour, fake item, or expired)</p>
                            <p>* Delivered product is does not match product description or picture (i.e product not as advertised)</p>
                            <p>* Delivered product does not fit. (i.e. size is unsuitable)</p>
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="refund-Policy">
                    <Card className='text-md bg-white p-4'>
                        <h1 className='my-2 font-bold'>Refund Policy</h1>
                        <div className='pl-3'>
                            <p>* If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Darkar app or website. Return request must be raised within 14 days for DarkarMall items, or within 7 days for non-DarkarMall items from the date of delivery.</p>
                            <p>* For electronic appliances & mobile phones related issues after usage or after the return policy period, please check if the product is covered under seller warranty or brand warranty. For more information on warranty claims.</p>
                            <p>* For selected categories, we accept a change of mind. Please refer to the section below on Return Policy per Category for more information.</p>
                        </div>
                        <h1 className='my-2 font-bold'>Valid reasons to refund an item</h1>
                        <div className='pl-3'>
                            <p>* Delivered product is damaged (i.e. physically destroyed or broken) / defective (e.g. unable to switch on)more information.</p>
                            <p>* Delivered product is incomplete (i.e. has missing items and/or accessories)</p>
                            <p>* Delivered product is incorrect (i.e. wrong product/size/colour, fake item, or expired)</p>
                            <p>* Delivered product is does not match product description or picture (i.e product not as advertised)</p>
                            <p>* Delivered product does not fit. (i.e. size is unsuitable)</p>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
