'use client'
import { useState, useEffect } from 'react';
import ShowAll from './ShowAll';
import CardItem from '../CardItem';
import CustomButton from '../CustomButton';

export default function TopTrending({ products = [] }) {
  const initialCount = 12;
  const loadIncrement = 6; 

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadedCount, setLoadedCount] = useState(initialCount);

  useEffect(() => {
    if (products.length > 0) {
      setVisibleProducts(products.slice(0, initialCount));
    }
  }, [products]);

  const handleShowMore = () => {
    const newLoadedCount = loadedCount + loadIncrement;
    setVisibleProducts(products.slice(0, newLoadedCount));
    setLoadedCount(newLoadedCount);
  };

  const handleShowLess = () => {
    setVisibleProducts(products.slice(0, initialCount));
    setLoadedCount(initialCount);
  };

  return (
    <section>
      <ShowAll title={'Top Trending (Week)'} link={'/products'} />
      <div className='card'>
        {visibleProducts.map(item => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>
      <div className='flex justify-center my-10'>
        {loadedCount < products.length ? (
          <CustomButton 
            style={'bg-primary hover:bg-[#F85606]/50 pt-5 pb-4 px-5 rounded-full'} 
            title={'Show More'} 
            click={handleShowMore} 
          />
        ) : (
          <CustomButton 
            style={'bg-gray-500 hover:bg-gray-700 pt-5 pb-4 px-5 rounded-full'} 
            title={'Show Less'} 
            click={handleShowLess} 
          />
        )}
      </div>
    </section>
  );
}