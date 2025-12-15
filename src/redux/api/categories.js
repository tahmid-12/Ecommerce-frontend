import {baseAPI} from "@/redux/api/index";

const categories=baseAPI.injectEndpoints({
    endpoints:builder=>({
        getCategories:builder.query({
            query:()=>({
                url:"/categories"
            }),
            providesTags:["Categories"]
        })
    })
})

export const {useGetCategoriesQuery}=categories