
import { api } from "@/api";

export const fetchWishList = async () => {
    const res = await api.get(`/wishlist`);
    return res.data;
};
export const addToWishList = async (value) => {
    const res = await api.post(`/wishlist`, value);
    return res.data;

};
export const removeToWishList = async (value) => {
    const res = await api.delete(`/wishlist`, value);
    return res.data;
};