"use client"

import React, {useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '../ui/select';
import {RiLayoutGridFill} from "react-icons/ri";
import CardItem from '../CardItem';
import {Button} from '../ui/button';
import {Skeleton} from '../ui/skeleton';

const filters = ["Best Match", "Price: Low to High", "Price: High to Low", "Newest Arrivals", "Top Sales"]

const ProductRight = ({products, isLoading, cat, filter, setFilter,elem}) => {
    return (
        <section className='w-full'>
            <div className='center w-full'>
                <div>
                    <p className='text-md'>{products?.length} items found for <span
                        className='text-primary'>{cat || `All`}</span></p>
                    {elem}
                </div>
                <div className='flex gap-5'>
                    <div className='flex gap-3 text-md items-center'>
                        <p className='mt-1'>Sort By:</p>
                        <Select

                            value={filter}
                            onValueChange={setFilter}
                            className=''>
                            <SelectTrigger
                                className="w-[180px] border-[1px] border-gray-500 outline-none">
                                <SelectValue placeholder="Best Match"/>
                            </SelectTrigger>
                            <SelectContent
                            >
                                <SelectGroup>
                                    {
                                        filters?.map((item, index) => <SelectItem key={index}
                                                                                  value={item}>{item}</SelectItem>)
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex gap-3 text-md items-center'>
                        <p className='mt-1'>View By:</p>
                        <RiLayoutGridFill className='text-2xl hover:text-primary'/>
                    </div>
                </div>
            </div>
            <div className='shadow-3xl mt-5 rounded-2xl grid grid-cols-3 xl:gap-10 gap-5 p-5'>
                {!isLoading && !products ? <><Skeleton
                    className="h-[300px] w-[250px] border-none rounded-2xl hover:shadow-5xl bg-slate-300"/><Skeleton
                    className="h-[300px] w-[250px] border-none rounded-2xl hover:shadow-5xl bg-slate-300"/><Skeleton
                    className="h-[300px] w-[250px] border-none rounded-2xl hover:shadow-5xl bg-slate-300"/><Skeleton
                    className="h-[300px] w-[250px] border-none rounded-2xl hover:shadow-5xl bg-slate-300"/></> : products?.map(item => (
                    <CardItem key={item.id} item={item}/>
                ))}
            </div>
            {!isLoading && products && <div className='my-10 centerAll'>
                <div className='w-1/2 center'>
                    <div>Did you find what you were looking for?</div>
                    <div className='flex gap-5'>
                        <Button
                            className='border-[1px] border-primary text-gray-500 rounded-2xl bg-transparent w-20 py-2'>Yes</Button>
                        <Button
                            className='border-[1px] border-primary text-gray-500 rounded-2xl bg-transparent w-20 py-2'>No</Button>
                    </div>
                </div>
                <div className='w-1/2 flex justify-end'>
                    <div className='flex justify-center xl:gap-5 gap-2 text-md w-[70%]'>
                        <div className='w-7 border-[1px] border-primary text-center rounded-md pt-[2px]'>{'<'}</div>
                        <div className='w-7 border-[1px] border-primary text-center rounded-md pt-[2px]'>1</div>
                        <div className='w-7 border-[1px] border-primary text-center rounded-md pt-[2px]'>2</div>
                        <div className='w-7 border-[1px] border-primary text-center rounded-md pt-[2px]'>3</div>
                        <div className=''>.</div>
                        <div className=''>.</div>
                        <div className='w-7 border-[1px] border-primary text-center rounded-md pt-[2px]'>99</div>
                        <div className='w-7 border-[1px] border-primary text-center rounded-md pt-[2px]'>{'>'}</div>
                    </div>
                </div>
            </div>}
        </section>
    );
};

export default ProductRight;