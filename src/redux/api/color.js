import {baseAPI} from "@/redux/api/index";

const color = baseAPI.injectEndpoints({
    endpoints: builder => ({
        getColors: builder.query({
            query: () => ({
                url: "/colors"
            }),
            providesTags: ["Colors"]
        })
    })
})

export const {useGetColorsQuery} = color