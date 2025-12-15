import { benefits } from '@/constants'
import Image from 'next/image'


export default function Benefits() {
  return (
    <section className='md:flex hidden  justify-between p-4 bg-light rounded-2xl mb-5'>
      {benefits.map(item=>(
        <div key={item.id} className='flex items-center gap-2'>
          <Image src={item.icon} alt={item.title} className=''/>
          <p className='lg:text-xl text-[16px] pt-1'>{item.title}</p>
        </div>
      ))}
    </section>
  )
}

