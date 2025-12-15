'use client'
import {MobileNav} from '@/components'
import {Card} from '@/components/ui/card'
import ProfileForm from '@/components/user/ProfileForm'


export default function Profile() {
    
    return (
        <>
            <MobileNav title={'My Profile'} link={'/my-account'}/>
            <section className='mb-10 md:mt-0 mt-16'>
                <h1 className='text-3xl font-bold md:block hidden'>My Profile</h1>
                <Card className='bg-white rounded-2xl  shadow-5xl mt-9 p-5'>
                    {<ProfileForm isProfile={true} />}
                </Card>
            </section>
        </>
    )
}
