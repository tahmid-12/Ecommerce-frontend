import {baseAPI} from "@/redux/api";
import {toast} from "react-hot-toast";
import {errorMessage} from "@/lib/utils";

const order = baseAPI.injectEndpoints({
    endpoints: builder => ({
        placeOrder: builder.mutation({
            query(data, params) {
                return {
                    url: "/orders", method: "POST", data, params
                }
            }, invalidatesTags: ["Carts", "Orders"]
        }),
        guestPlaceOrder: builder.mutation({
            query(data, params) {
                return {
                    url: "/guest-orders", method: "POST", data, params
                }
            }, invalidatesTags: ["Carts", "Orders"]
        }), 
        getGuestOrder: builder.query({
            query(cartId) {
                return {
                    url: "/guest-orders",
                    method: "POST",
                    data: { cartId }
                }
            }, providesTags: ["Orders"]
        }),
        myOrder: builder.query({
            query() {
                return {
                    url: "/orders"
                }
            }, providesTags: ["Orders"]
        }), 
        updateOrder: builder.mutation({
            query({id, ...data}) {
                return {
                    url: `/orders/${id}`, method: "PATCH", data
                }
            }, invalidatesTags: ["Orders"]
        })
    })
})

export const {usePlaceOrderMutation, useGuestPlaceOrderMutation, useMyOrderQuery, useUpdateOrderMutation} = order