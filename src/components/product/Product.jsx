"use client";
import React, {Suspense, useMemo, useEffect} from "react";
import RouteIdentify from "../RouteIdentify";
import ImageSection from "./ImageSection";
import InfoSection from "./InfoSection";
import TabSection from "./TabSection";
import DeliveryInfo from "./DeliveryInfo";
import RelatedProducts from "./RelatedProducts";
import MostSearchKeywords from "./MostSearchKeywords";
import {MobileNav} from "..";
import {useGetProductsQuery, useGetSingleProductQuery} from "@/redux/api/product";

export default function Product({id}) {
    const {data: product} = useGetSingleProductQuery(id);
    // console.log("Product in Id", product);
// 
    useEffect(() => {
        if (product) {
          document.title = product.name || "Product Details";
        }
      }, [product]);

    return (
        <main>
            {/* web section */}
            <Suspense fallback={<div>Loading...</div>}>
                <section className=" pb-10">
                    <MobileNav isSearch={true} isCart={true}/>
                    {/* route identify */}
                    <RouteIdentify {...product}/>

                    {/*  product */}
                    <div className="flex md:gap-5 md:my-5 my-7 ">
                        {/* product detail and review section */}
                        <div className="md:w-[70%] w-full rounded-2xl shadow-5xl bg-white md:px-3 px-0 py-5">
                            {/* upper section */}
                            <div className="relative md:flex gap-4 w-full ">
                                {/* image section */}
                                <ImageSection product={product}/>
                                {/* information section */}
                                <InfoSection product={product}/>
                            </div>
                            {/* lower section   */}
                            <TabSection product={product}/>
                        </div>
                        {/* delivery and services */}
                        <DeliveryInfo product={product}/>
                    </div>

                    {/* related products */}
                    <RelatedProducts product={product}/>
                    {/* Most Search Keywords */}
                    {/*<MostSearchKeywords/>*/}
                </section>

            </Suspense>
        </main>
    );
}
