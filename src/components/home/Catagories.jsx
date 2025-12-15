import React from 'react'
import ShowAll from './ShowAll'
import CardItem from '../CardItem'


export default function Catagories({products}) {
  return (
    <section>
      <ShowAll title={'Catagories'} link={'/products'} />
      <div className='card'>
        {products?.map(item =>
          <CardItem key={item.id} item={item} isCatagories={true} />
        )}
      </div>
    </section>
  )
}

