import {baseAPI} from "@/redux/api/index";

const wishlist = baseAPI.injectEndpoints({
    endpoints: builder => ({
        getWishlist: builder.query({
            query: () => ({
                url: "/wishlist"
            }),
            providesTags: ["Wishlist"]
        }),
        addToWishlist: builder.mutation({
            query: body => ({
                url: "/wishlist",
                method: "POST",
                data: body
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                if (data) {
                    dispatch(baseAPI.util.updateQueryData("getWishlist", undefined, d => {
                        return data
                    }))
                }
            }
        }),
        removeFromWishlist: builder.mutation({
            query: id => ({
                url: `/wishlist/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {

                const patch = dispatch(baseAPI.util.updateQueryData("getWishlist", undefined, d => {
                    return d.filter(item => item.id !== arg)
                }))

                try {
                    await queryFulfilled
                } catch {
                    patch.undo()
                }

            }
        })
    })
})

export const {useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation} = wishlist