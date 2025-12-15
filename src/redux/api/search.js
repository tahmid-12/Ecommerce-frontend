import {baseAPI} from "@/redux/api/index";

const search = baseAPI.injectEndpoints({
    endpoints: builder => ({
        getSearch: builder.query({
            query: (params) => ({
                url: `/search?query=${encodeURIComponent(params)}`
            }),
            providesTags: ["Search"]
        })
    })
})

export const { useGetSearchQuery } = search;