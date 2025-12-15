'use client'
import React, {useState} from 'react'
import {Checkbox} from '../ui/checkbox'

function CheckboxList({items, setTerm, term}) {
    const [total, setTotal] = useState(5)

    return (
        <div className='my-3 mx-1'>
            {
                items?.slice(0, total)?.flatMap((item, index) => (
                    <div key={index} onClick={() => setTerm(prev => {
                        if (prev === item?.name) {
                            return ""
                        }
                        return item?.name
                    })} className='flex gap-2 text-md  cursor-pointer'>
                        <Checkbox checked={term === item?.name} id="terms" className='mt-[2px]'/>
                        <p>{item?.name}</p>
                    </div>
                ))
            }
            {items?.length > 5 &&
                <p onClick={() => setTotal(items?.length)}
                   className='text-md text-primary text-right pt-1 cursor-pointer'>+ View More</p>
            }
        </div>
    )
}

export default CheckboxList