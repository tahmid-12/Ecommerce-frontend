'use client'
import {MobileNav} from '@/components'
import {Card} from '@/components/ui/card'
import ProfileForm from '@/components/user/ProfileForm'
import React from 'react'

export default function EditPage() {
    
    return (
        <>
            <MobileNav title={'Edit Profile'} link={'/profile'} />
            <section className='mb-10 '>
                <h1 className='text-3xl font-bold'>Edit Profile</h1>
                <Card className='bg-white rounded-2xl  shadow-5xl mt-9 p-5'>
                    {<ProfileForm isProfile={false} isEdit={true}/>}
                </Card>
            </section>
        </>
    )
}
