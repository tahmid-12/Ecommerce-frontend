"use client"
import {useGetProductsQuery} from "@/redux/api/product";
import CardItem from "@/components/CardItem";
import {Skeleton} from "@/components/ui/skeleton";

export default function Products({storeId}) {
    const {data, isLoading} = useGetProductsQuery({seller: storeId})
    return (
        <div>
            {
                isLoading ?
                    <Skeleton/>
                    : (
                        <div className={'grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-8'}>
                            {data?.map(product => {
                                return <CardItem key={product.id} item={product}/>
                            })}
                        </div>
                    )
            }
        </div>
    )
}