import {baseAPI} from "@/redux/api";
import {errorMessage, successMessage} from "@/lib/utils";

const address = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getAddress: builder.query({
            query() {
                return {
                    url: '/address'
                }
            },
            providesTags: ["Address"]
        }),
        addNewAddress: builder.mutation({
            query(arg) {
                return {
                    url: '/address',
                    data: arg,
                    method: "post"
                }
            },
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                const {data} = await queryFulfilled
                if (!data) {
                    return
                }
                dispatch(baseAPI.util.updateQueryData("getAddress", undefined, (draft) => {
                    draft.push(data)
                }))

            },
            invalidatesTags: ["User"]
        }),
        addGuestAddress: builder.mutation({
            query(arg){
                return {
                    url: "/guest-address",
                    data: arg,
                    method: "post"
                }
            },
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                const {data} = await queryFulfilled
                if (!data) {
                    return
                }
                dispatch(baseAPI.util.updateQueryData("getAddress", undefined, (draft) => {
                    draft.push(data)
                }))

            },
        }),
        updateAddress: builder.mutation({
            query({id, ...data}) {
                return {
                    url: `/address/${id}`,
                    data: data,
                    method: "patch"
                }
            },
            onQueryStarted: async (arg, {dispatch,queryFulfilled}) => {
                const patch = dispatch(baseAPI.util.updateQueryData("getAddress", undefined, (draft) => {
                    return draft.map((a) => {
                        if (a.id === arg.id) {
                            return {...a, ...arg}
                        }
                        return a
                    })
                }))

                try {
                    await queryFulfilled
                    successMessage("Address updated successfully")
                } catch (e) {
                    errorMessage(e)
                    patch.undo()
                }
            },
            invalidatesTags:["User"]
        }),
        deleteAddress: builder.mutation({
            query(id) {
                return {
                    url: `/address/${id}`,
                    method: "delete"
                }
            },
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                const patch = dispatch(baseAPI.util.updateQueryData("getAddress", undefined, (draft) => {
                    return draft.filter((a) => a.id !== arg)
                }))

                try {
                    await queryFulfilled
                    successMessage("Address deleted successfully")
                } catch (e) {
                    errorMessage(e)
                    patch.undo()
                }
            }
        })
    })
})

export const {
    useGetAddressQuery,
    useAddNewAddressMutation,
    useAddGuestAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation
} = address