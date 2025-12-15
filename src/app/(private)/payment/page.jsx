import { MobileNav } from '@/components'
import OrderSummary from '@/components/payment/OrderSummary'
import PaymentMethods from '@/components/payment/PaymentMethods'
import React from 'react'

function PaymentPage(props) {
  return (
    <main className='flex md:flex-row flex-col-reverse md:mt-12 md:mb-10 mb-0 mt-16 gap-5 h-min'>
        <MobileNav title={'payment'} />
        <PaymentMethods/>
        <OrderSummary/>
    </main>
  )
}

export default PaymentPage