import {baseAPI} from "@/redux/api/index";

const size = baseAPI.injectEndpoints({
    endpoints: builder => ({
        getSizes: builder.query({
            query: () => ({
                url: "/sizes",
            }),
            providesTags: ["Sizes"]
        })
    })
})

export const {useGetSizesQuery} = size