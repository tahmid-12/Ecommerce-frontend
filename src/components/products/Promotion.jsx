import React from 'react';
import { IoPricetag } from 'react-icons/io5';

const Promotion = ({item}) => {
    return (
        <div className='my-3'>
            {item.list.flatMap((item, index) => (
                <div key={index} className='flex items-center px-2 py-2 border-[2px] border-primary rounded-full  text-center text-md mb-2 cursor-pointer '>
                    <IoPricetag className='text-primary -p-[1px]' />
                    <p className='hover:text-primary'>{item}</p>
                </div>
            ))}
        </div>
    );
};

export default Promotion;