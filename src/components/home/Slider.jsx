'use client'
import { sliderImages } from '@/constants'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 1 minute

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <section className='relative overflow-hidden'>
      <div className=' transform duration-200 ease-in-out'>
        <Image src={sliderImages[currentIndex]} alt={`Slide ${currentIndex}`} className='lg:h-[460px] h-[410px] w-[100%] sm:rounded-2xl object-cover' />
      </div>
      <div className='absolute transform -translate-x-1/2 bottom-5 left-1/2 flex gap-1'>
        {sliderImages.map((_, index) => (
          <div key={index} onClick={() => handlePaginationClick(index)} className={`slider ${index === currentIndex ? 'bg-primary': 'bg-gray-600'}`}></div>
        ))}
      </div>
      <div className='slider-btn' onClick={prevSlide}>
        <ChevronLeft color='#fff' />
      </div>
      <div className='slider-btn right-0' onClick={nextSlide}>
        <ChevronRight color='#fff' />
      </div>
    </section>
  )
}
