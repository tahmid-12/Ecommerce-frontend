'use client'
import {
    Benefits,
    Catagories,
    Features,
    FlashSell,
    HeaderSection,
    JustForYou,
    MobileHomeNav,
    RecentAdded,
    TopTrending
} from '@/components'
import {Skeleton} from '@/components/ui/skeleton'
import {Suspense} from 'react'
import {useGetProductsQuery} from "@/redux/api/product";
import {useGetCategoriesQuery} from "@/redux/api/categories";


export default function Home() {
    const {data: products, isLoading} = useGetProductsQuery()
    const {data: categories} = useGetCategoriesQuery()

    // console.log("Categories", products);

    // if(isLoading || !products || !categories){
    //   return <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    // }
    // console.log(products)

    return (
        <main className=' pb-10'>
            {/* catagoryLink & slider */}
            <section className='relative'>
                {/* web section */}
                <HeaderSection/>
                {/* mobile section  */}
                <div className='fixed md:hidden top-0 w-full left-[50%] translate-x-[-50%] z-50'>
                    <MobileHomeNav/>
                </div>
            </section>
            {/* benefits */}
            <Benefits/>
            <Features/>

            <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"/>}>
                <FlashSell products={products}/>
                <Catagories products={categories}/>
                <JustForYou products={products}/>
                <RecentAdded products={products}/>
                <TopTrending products={products}/>
            </Suspense>

        </main>
    )
}
