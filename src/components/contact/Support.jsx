import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import MessageForm from './MessageForm'

export default function Support() {
    return (
        <div className='w-[50%]  flex justify-end'>
            <div className='w-[75%] '>
                <h1 className='text-xlg font-bold'>Support Message</h1>
                <Card className=' rounded-2xl shadow-5xl bg-white mt-4 '>
                    <CardContent className=' mt-5'>
                        <MessageForm/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
