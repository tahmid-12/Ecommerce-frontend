import Product from "@/components/product/Product";

export default function ProductPage({params}) {

    return <Product id={params.id}/>;
}


// export async function generateMetadata(
//     {params, searchParams},
//     parent
// ) {

//     // fetch data
//     console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

//     // NEXT_PUBLIC_API_URL
//     const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`).then(res => res.json())
    

//     // optionally access and extend (rather than replace) parent metadata
//     const previousImages = (await parent).openGraph?.images || []

//     return {
//         title: product?.short_desc,
//         description: product?.meta_desc,
//         openGraph: {
//             images: [`${process.env.NEXT_PUBLIC_IMAGE_API}/${product?.images[0]?.path}`, ...previousImages],
//         },
//     }
// }
