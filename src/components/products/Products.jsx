'use client'
import { prodCatagories, sortBy, traditionalCloths } from '@/constants'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import ProductRight from './ProductRight'
import { IoPricetag } from 'react-icons/io5'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import CardItem from '../CardItem'
import { Skeleton } from '../ui/skeleton'
import { useGetProductsQuery } from "@/redux/api/product";
import { useGetCategoriesQuery } from "@/redux/api/categories";
import { Separator } from "@/components/ui/separator";
import CheckboxList from "@/components/products/CheckboxList";
import { useGetBrandsQuery } from "@/redux/api/brand";
import { useGetSizesQuery } from "@/redux/api/size";
import { useGetColorsQuery } from "@/redux/api/color";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export default function Products() {
    const [sorted, setSorted] = useState(false)
    const [cat, setCat] = useState("")
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [filter, setFilter] = useState("")
    const [price, setPrice] = useState({ minPrice: "", maxPrice: "" })

    const [filteredProducts, setFilteredProducts] = useState([])
    const { data: brands } = useGetBrandsQuery()
    const { data: sizes } = useGetSizesQuery()
    const { data: colors } = useGetColorsQuery()
    const { data, isLoading } = useGetProductsQuery({
        cat, brand, size, color
    })
    const { data: categories } = useGetCategoriesQuery()

    const handlePriceFilter = () => {
        setFilteredProducts(data?.filter(item => item?.offer_price >= price?.minPrice && item?.offer_price <= price?.maxPrice))
    }

    useEffect(() => {
        const applyFilter = () => {
            if (!data) return;

            let filtered = [...data];

            switch (filter) {
                case "Best Match":
                    console.log(filtered);
                    break;
                case "Price: Low to High":
                    filtered = filtered.sort((a, b) => {
                        const priceA = a?.offer_price ? Number(a.offer_price) : Number.MAX_SAFE_INTEGER;
                        const priceB = b?.offer_price ? Number(b.offer_price) : Number.MAX_SAFE_INTEGER;
                        return priceA - priceB;
                    });
                    break;
                case "Price: High to Low":
                    filtered = filtered.sort((a, b) => {
                        const priceA = a?.offer_price ? Number(a.offer_price) : Number.MAX_SAFE_INTEGER;
                        const priceB = b?.offer_price ? Number(b.offer_price) : Number.MAX_SAFE_INTEGER;
                        return priceB - priceA;
                    });
                    break;
                case "Newest Arrivals":
                    filtered = filtered.sort((a, b) => {
                        const dateA = a?.createdAt ? new Date(a.createdAt) : new Date(0);
                        const dateB = b?.createdAt ? new Date(b.createdAt) : new Date(0);
                        return dateB - dateA;
                    });
                    break;
                case "Top Sales":
                    // Add logic for Top Sales if needed
                    break;
                default:
                    break;
            }

            setFilteredProducts(filtered);
        };

        applyFilter();
    }, [data, filter]);

    if (isLoading && !data) {
        return <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    }
    return (<section className=''>
        {/* web section */}
        <div className='md:block hidden pb-10'>
            {/* route list */}
            <div className='flex gap-4 text-md py-2 border-b-[3px]'>
                <p>Home / </p>
                <p>Products / </p>
            </div>
            {/* product variation */}
            <div className='flex my-5 rounded-2xl border-[1px] shadow-5xl '>
                {categories?.map(item => (<div key={item.id}
                    className={`w-[250px] flex flex-col items-center ${item.id !== prodCatagories.length && 'border-r-[3px]'} py-3 cursor-pointer`}>
                    <Image width={100} height={100}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${item?.image?.path}`} alt={item?.name}
                        className='xl:w-36 w-28 xl:h-36 h-28' />
                    <p className='text-md hover:text-primary pt-2'>{item?.name}</p>
                </div>))}
            </div>
            {/*  */}
            <div className='flex gap-10'>
                {/* product selected type section */}
                <div className='xl:w-[250px] w-[180px]'>
                    <h1 className='text-2xl font-bold'>Filters</h1>
                    <div className={'space-y-3'}>
                        <div>
                            <h1 className='text-md font-semibold'>Categories</h1>
                            <Separator />
                            <CheckboxList term={cat} setTerm={setCat} items={categories} />
                        </div>
                        <div>
                            <h1 className='text-md font-semibold'>Brands</h1>
                            <Separator />
                            <CheckboxList term={brand} setTerm={setBrand} items={brands} />
                        </div>

                        <div>
                            <h1 className='text-md font-semibold'>Sizes</h1>
                            <Separator />
                            <CheckboxList term={size} setTerm={setSize} items={sizes} />
                        </div>

                        <div>
                            <h1 className='text-md font-semibold'>Colors</h1>
                            <Separator />
                            <CheckboxList term={color} setTerm={setColor} items={colors} />
                        </div>

                        <div className='flex items-center my-3'>
                            <Input placeholder='min'
                                onChange={(e) => setPrice(prev => ({ ...prev, minPrice: e.target.value }))}
                                className='border-[2px] border-primary rounded-2xl placeholder:text-center bg-transparent outline-none text-gray-500 placeholder:text-gray-500 text-center' />-
                            <Input
                                onChange={(e) => setPrice(prev => ({ ...prev, maxPrice: e.target.value }))}
                                placeholder='max'
                                className='border-[2px] border-primary rounded-2xl placeholder:text-center bg-transparent outline-none text-gray-500 placeholder:text-gray-500 text-center' />
                            <Button onClick={handlePriceFilter}
                                className='hover:bg-[#F85606]/50 ml-1'>Apply</Button>
                        </div>
                    </div>
                </div>
                {/* product section */}
                <ProductRight cat={cat} products={filteredProducts} filter={filter} setFilter={setFilter}
                    isLoading={isLoading}

                    elem={<div className={'flex gap-2'}>
                        {cat && <span className={'bg-primary text-white rounded-md px-1 flex'}>{cat}
                            <XIcon onClick={() => setCat("")} className={'cursor-pointer'}
                                size={16} />
                        </span>}
                        {
                            brand &&
                            <span className={'bg-primary text-white rounded-md px-1 flex'}>{brand} <XIcon
                                onClick={() => setBrand("")} className={'cursor-pointer'}
                                size={16} /></span>
                        }
                        {
                            size &&
                            <span className={'bg-primary text-white rounded-md px-1 flex'}>{size} <XIcon
                                onClick={() => setSize("")} className={'cursor-pointer'}
                                size={16} /></span>
                        }
                        {
                            color &&
                            <span className={'bg-primary text-white rounded-md px-1 flex'}>{color} <XIcon
                                onClick={() => setColor("")} className={'cursor-pointer'}
                                size={16} /></span>}
                        {
                            price?.minPrice && price?.maxPrice && <span
                                className={'bg-primary text-white rounded-md px-1 flex'}>

                                {price?.minPrice} - {price?.maxPrice}<XIcon
                                    onClick={() => {
                                        setPrice({ minPrice: "", maxPrice: "" })
                                        setFilteredProducts(data)
                                    }}
                                    className={'cursor-pointer'} size={16} /></span>
                        }


                        {
                            filter && <span
                                className={'bg-primary text-white rounded-md px-1 flex'}>

                                {filter}<XIcon
                                    onClick={() => {

                                        setFilter("")
                                    }}
                                    className={'cursor-pointer'} size={16} /></span>
                        }
                        {

                            (cat || brand || size || color || price?.minPrice || price?.maxPrice || filter) &&
                            <button onClick={() => {
                                setFilter("")
                                setBrand("")
                                setSize("")
                                setColor("")
                                setCat("")
                                setPrice({ minPrice: "", maxPrice: "" })
                                setFilteredProducts(data)
                            }} className='text-primary'>Clear All
                            </button>
                        }
                    </div>}
                />
            </div>
        </div>
        {/* mobile section */}
        <div className='md:hidden block absolute w-full top-9 -z-10'>
            <div className='bg-white pt-10 px-2 '>
                {/* promotion section */}
                <div className='center gap-4 '>
                    {filteredProducts?.slice(0, 4)?.map((item, index) => (<div key={index}
                        className='h-20 w-[25%] border-[2px] border-gray-200 centerAll flex-col  rounded-lg'>
                        <IoPricetag className='text-primary -p-[1px]' />
                        <div className='w-[80%] mx-auto'>
                            <p className='text-center text-gray-500'>{item?.name}</p>
                        </div>
                    </div>))}
                    {/* query section */}
                </div>


            </div>
            {/*  */}
            <div className=''>
                <div className='mb-2 bg-white py-2 px-2'>
                    <div>
                        <div onClick={() => setSorted(!sorted)} className='border-[1px] w-20 text-center'><p
                            className=''>Sort By</p></div>
                        {sorted && sortBy.flatMap((item, index) => (
                            <div key={index} className={`${sorted ? '' : ' '}  `}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >{item}</div>))}
                    </div>
                </div>

                <div className=''>
                    <ScrollArea className="h-32 w-full bg-white py-2 shadow-5xl">
                        <div className='flex  w-max  space-x-2'>
                            {prodCatagories.map((item, index) => (<div key={item.id} className="shrink-0">
                                <div className='overflow-hidden '>
                                    <Image src={item.img} alt={item.title} className=" h-28 w-36 object-cover"
                                    />
                                </div>
                            </div>))}
                        </div>
                        <ScrollBar orientation="horizontal" className='hidden' />
                    </ScrollArea>
                    {/* products section */}
                    <div
                        className=' bg-white shadow-3xl mt-4 py-5 px-5 rounded-2xl grid sm:grid-cols-3 grid-cols-2  gap-5'>

                        {filteredProducts?.map((item, index) => (<CardItem key={item.id} item={item} />))}
                    </div>
                </div>
            </div>
        </div>
    </section>)
}
