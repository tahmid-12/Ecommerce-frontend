import { api } from "@/api";

export const fetchCarts = async () => {
  const res = await api.get(`/carts`);
  return res.data;
};

export const addToCart = async (value) => {
  const res = await api.post(`/carts`, value);
  return res.data;
};