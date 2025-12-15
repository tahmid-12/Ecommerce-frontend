import React from 'react'
import ShowAll from './ShowAll'
import CardItem from '../CardItem'


export default function JustForYou({products}) {
  return (
    <section>
      <ShowAll title={'Just For You'} link={'/products'} />
      <div className='card'>
        {products?.map(item =>
          <CardItem key={item.id} item={item} />
        )}
      </div>
    </section>
  )
}

