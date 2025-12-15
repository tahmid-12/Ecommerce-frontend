import ShowAll from './ShowAll'

import CardItem from '../CardItem'
// import { products } from '@/constants'

export default function FlashSell({ isLoading, products}) {
  // console.log(products)
  const data = products?.slice(0,6)
  return (
    <section>
      <ShowAll title={'Flash Sell Offer'} link={'/products'} />
      <div className='card'>
        {  data?.map(item =>
          <CardItem key={item.id} item={item} isFlash={true} />
        )}
      </div>
    </section>
  )
}

