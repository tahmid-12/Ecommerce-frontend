import {baseAPI} from "@/redux/api/index";
import {successMessage} from "@/lib/utils";

const cart = baseAPI.injectEndpoints({
    endpoints: builder => ({
        getCarts: builder.query({
            query: () => ({
                url: "/carts"
            }), providesTags: ["Carts"]
        }), 
        addToCart: builder.mutation({
            query: body => ({
                url: "/carts", method: "POST", data: body
            }), async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled

                if (data) {
                    dispatch(baseAPI.util.updateQueryData("getCarts", undefined, d => {
                        d.push(data)
                    }))
                    successMessage("Added to cart")
                }
            }
        }),
        addToGuestCart: builder.mutation({
            query: body => ({
                url: "/guest-carts", 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                data: body
            }), 
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    // console.log("API Response Data in api redux:", data);
        
                    if (data && typeof data === "object") { 
                        dispatch(baseAPI.util.updateQueryData("getCarts", undefined, d => {
                            d.push(data);
                        }));
                        successMessage("Added to cart");
                    } else {
                        console.warn("Unexpected API response:", data);
                    }
                } catch (error) {
                    console.error("Error in addToGuestCart:", error);
                }
            }
        }),
        updateCart: builder.mutation({
            query({id, ...body}) {
                return {
                    url: `/carts/${id}`,
                    method: "PATCH",
                    data: body
                }
            },

            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(baseAPI.util.updateQueryData("getCarts", undefined, d => {
                    return d.map(item => item.id === arg.id ? {...item, ...arg} : item)
                }))

                console.log(arg)

                try {
                    await queryFulfilled
                    successMessage("Added to cart")
                } catch {
                    patchResult.undo()
                }
            }
        }),
        removeFromCart: builder.mutation({
            query: id => ({
                url: `/carts/${id}`,
                method: "DELETE"
            }), async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(baseAPI.util.updateQueryData("getCarts", undefined, d => {
                    return d.filter(item => item.id !== arg)
                }))
                try {
                    await queryFulfilled
                    successMessage("Removed from cart")
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
})

export const {useGetCartsQuery, useAddToCartMutation, useAddToGuestCartMutation, useUpdateCartMutation,useRemoveFromCartMutation} = cart