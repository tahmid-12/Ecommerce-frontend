import React from 'react'
import CardItem from '../CardItem'
import {useGetProductsQuery} from '@/redux/api/product'

function RelatedProducts({product}) {
    const {data: products} = useGetProductsQuery({cat: product?.category?.name});

    return (
        <div className='my-5'>
            <h1 className='text-2xl font-bold '>Related Clothing</h1>
            <div
                className='bg-[#F6F6F6]  shadow-3xl mt-4 py-5 px-5 rounded-2xl grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  gap-5'>
                {products?.slice(0, 5).map((item, index) => (
                    <CardItem key={item.id} item={item}/>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts