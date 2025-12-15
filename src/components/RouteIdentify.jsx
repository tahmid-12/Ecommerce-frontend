import React from 'react'

function RouteIdentify({category,productGroup}) {
    return (
        <div className='md:flex hidden gap-4 text-md py-2 border-b-[3px]'>
            <p>Home / </p>
            <p>{category?.name} / </p>
            <p className='text-primary'>{productGroup?.name}</p>
        </div>
    )
}

export default RouteIdentify