import React from 'react';
import ShowAll from './ShowAll';
import CardItem from '../CardItem';


export default function RecentAdded({products}) {
    return (
        <section>
            <ShowAll title={'Recent Added Products'} link={'/products'} />
            <div className='card'>
                {products?.map(item =>
                    <CardItem key={item.id} item={item} />
                )}
            </div>
        </section>
    );
};