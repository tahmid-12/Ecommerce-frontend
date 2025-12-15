'use client'
import { CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

export default function CardHeaderSection({ title, isDelivery }) {
    return (
        <CardHeader >
            <div className='center'>
                <CardTitle className={`${isDelivery&& 'text-gray-500'} text-md`}>{title}</CardTitle>
                <Button className='hover:bg-[#F85606]/40 text-[16px] w-[20%]'>Edit</Button>
            </div>
        </CardHeader>
    )
}
