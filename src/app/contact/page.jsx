import Contact from '@/components/contact/Contact'
import Support from '@/components/contact/Support'
import React from 'react'

export default function ContactPage() {
  return (
    <div className='flex my-10'>
      <Contact/>
      <Support/>
    </div>
  )
}
