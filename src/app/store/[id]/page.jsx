import Products from "@/app/store/[id]/components/Products";
import Image from "next/image";

export default function StorePage({params, searchParams}) {
    return (
        <div>
            <div className={'w-full bg-white rounded-b-md'}>
                <div className={'w-[400px] bg-white items-start p-4 rounded-md flex  gap-4'}>
                    <Image className={'bg-slate-100 rounded-md'}
                           src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${searchParams?.image}`} width={100} height={80}
                           alt={searchParams?.store}/>
                    <div>
                        <p className={'text-lg font-semibold text-gray-700'}>{searchParams?.store}</p>
                        <p className={'text-sm text-gray-500'}>427 Follower</p>
                        <p className={'text-sm text-gray-500'}>80% Positive Seller Ratings</p>
                    </div>
                </div>
            </div>
            <Products storeId={params?.id}/>
        </div>
    )
}