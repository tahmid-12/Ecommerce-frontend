import {baseAPI} from "@/redux/api/index";

const products = baseAPI.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: (params) => ({
                url: "/products",
                params
            }),
            providesTags: ["Products"]
        }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`
            }),
            providesTags: ["Products"]
        })
    })
})

export const {useGetProductsQuery, useGetSingleProductQuery} = products