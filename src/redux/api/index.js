import {api} from "@/api";
import {createApi} from "@reduxjs/toolkit/query/react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {log} from "next/dist/server/typescript/utils";
import {errorMessage} from "@/lib/utils";

const axiosBaseQuery =
    ({baseURL = "/"}) =>
        async ({url = "/", method = "get", data = {}, headers = {}, params = {}}) => {
            // console.log("🚀 API Request:", { baseURL, url, method, data, headers, params });
            try {
                const response = await api({baseURL, url, method, data, headers, params});
                // console.log("✅ API Response:", response.data);
                return {
                    data: response.data,
                };
            } catch (err) {
                console.error("❌ API Error:", err.response?.data || err.message);
                if (err.response?.data?.message) {
                    errorMessage(err)
                }
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };


export const baseAPI = createApi({
    baseQuery: axiosBaseQuery({baseURL: process.env.NEXT_PUBLIC_API_URL}),
    endpoints(build) {
        return {}
    },
    reducerPath: "baseAPI",
    tagTypes: ["Address", "Products", "Carts", "Wishlist", "Orders", "User", "Categories","Brands","Colors","Sizes", "Search"]
})