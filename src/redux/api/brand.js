import {baseAPI} from "@/redux/api/index";

const brand=baseAPI.injectEndpoints({
    endpoints:builder=>({
        getBrands:builder.query({
            query:(params)=>({
                url:"/brands",
                params
            }),
            providesTags:["Brands"]
        })
    })
})

export const {useGetBrandsQuery}=brand