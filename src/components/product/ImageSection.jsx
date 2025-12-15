"use client";
import { useZoomImageHover } from "@zoom-image/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

function ImageSection({ product, image }) {

    const [img, setImg] = useState(image);
    const imageHoverContainerRef = useRef(null)
    const zoomTargetRef = useRef(null)
    const { createZoomImage: createZoomImageHover } = useZoomImageHover()
    useEffect(() => {
        const imageContainer = imageHoverContainerRef.current
        const zoomTarget = zoomTargetRef.current
        createZoomImageHover(imageContainer, {
            zoomImageSource: img?.src,
            customZoom: { width: 500, height: 450 },
            zoomTarget,
            scale: 2,
        })
    }, [img, createZoomImageHover])

    useEffect(() => {
        if (product && product?.images?.length) {
            setImg(product.images[0]?.path)
        }
    }, [product])
    const refs = useRef([]);
    refs.current = [];
    const addRefs = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };



    const hoverHandler = useCallback((img, i) => {
        setImg(img?.path);
        refs.current[i]?.classList.add('active');
        for (var j = 0; j < product.images.length; j++) {
            if (i !== j) {
                refs.current[j]?.classList.remove('active');
            }
        }
    }, [refs, product])


    return (
        <div className='md:flex relative gap-2 md:w-[50%] w-full md:h-[450px] h-auto md:border-0 border-b-[1px] md:shadow-none shadow-5xl'>
            <div className='flex md:flex-col md:gap-4 md:w-max w-[90%]  md:relative absolute bottom-3 md:left-0 left-1/2 md:translate-x-0 -translate-x-1/2 md:rounded-none rounded-xl md:py-0 py-3 md:px-0 px-5 md:border-0 border-[1px]  md:shadow-none shadow-5xl bg-white md:bg-transparent'>
                {product?.images?.map((image, i) => (
                    <div
                        className={i === 0 ? 'img_wrap active' : 'img_wrap'}
                        key={i}
                        onMouseOver={() => hoverHandler(image, i)}
                        ref={addRefs}
                    >
                        <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API}${image.path}`} alt="" width={100} height={16} className='w-16 h-20 cursor-pointer  object-cover' />
                    </div>
                ))}
            </div>
            <div className="md:hidden block h-[450px] w-full bg-slate-100" >
            {<Image src={`${process.env.NEXT_PUBLIC_IMAGE_API}${img}`} width={1000} height={300} alt="img" className='w-full h-full ' />}
            </div>
            <div ref={imageHoverContainerRef} className="relative md:flex hidden h-[450px] w-[500px] items-start"> 
                {<Image src={`${process.env.NEXT_PUBLIC_IMAGE_API}${img}`} width={100} height={300} alt="img" className='w-full h-full object-contain' />}
                <div ref={zoomTargetRef} className="absolute left-[400px]  md:block hidden z-50"></div>
            </div>
        </div>
    )
}

export default ImageSection;
