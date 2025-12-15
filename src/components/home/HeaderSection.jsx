'use client'
import React, { useState } from 'react'
import { CatagoryLinks, Slider } from '..'
import { catagories } from '@/constants';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderSection() {

    const [isHovered, setIsHovered] = useState(false);
    const [isHoverSection, setIsHoverSection] = useState(false);
    const [id, setId] = useState(-1)
    const [sectionId, setSectionId] = useState(-1)
    const [sectionData, setSectionData] = useState({})
    const handleMouseEnter = (id) => {
        setIsHovered(true)
        setId(id)
        setSectionId(-1)
        setIsHoverSection(false)
    }
    const handleHoverSection = (id, item) => {
        setIsHoverSection(true)
        setSectionId(id)
        setSectionData(item)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
        setId(-1)
        setIsHoverSection(false)
        setSectionId(-1)
    }
    return (
        <div onMouseLeave={handleMouseLeave} className='flex  gap-5 md:pt-5 pb-5 py-0'>
            <div className='md:w-[30%] md:block hidden relative'>
                <CatagoryLinks isHovered={isHovered} id={id} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
            </div>

            <div className='md:w-[70%] w-full rounded-xl relative'>
                <Slider />
                {isHovered && catagories[id]?.items && catagories[id]?.items.length > 0 && (
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        className={`h-full ${isHoverSection ? 'w-full flex' : 'xl:w-[250px] w-[150px]'} py-3 absolute top-0 rounded-xl bg-white`}
                    >
                        <div>
                            {catagories[id]?.items.map((item, index) => (
                                <div key={item.id} className="flex gap-3 cursor-pointer">
                                    <div
                                        onMouseEnter={() => handleHoverSection(index, item)}
                                        className={`center ${isHoverSection && index == sectionId && "bg-background "} w-[250px]`}
                                    >
                                        <p
                                            className={`lg:text-xl text-[16px] px-5 ${isHoverSection && index == sectionId ? "text-primary" : "text-gray-400"
                                                } pt-2`}
                                        >
                                            {item.title}
                                        </p>
                                        {isHoverSection && index == sectionId && <ChevronRight size={30} color="#F85606" />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {isHoverSection && (
                            <div className="h-full mx-2 px-5 xl:w-[calc(100%-250px)] w-[calc(100%-150px)] border-l-[4px]">
                                <h1 className="lg:text-xl text-[16px] pt-2">{sectionData.title}</h1>
                                <div className="flex gap-10 mt-5">
                                    {sectionData?.lists?.map((item) => (
                                        <Link href={"/products"} key={item.id} className="hover:text-primary">
                                            <Image src={item.img} alt={item.title} className="w-16 h-16 rounded-full" />
                                            <p className="text-[14px] text-center">{item.title}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}
