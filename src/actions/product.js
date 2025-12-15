import { api } from "@/api";
// call get method
export const fetchProducts = async () => {
  const res = await api.get(`/products`);

  return res.data;
};
export const fetchCategory = async () => {
  const res = await api.get(`/categories`);

  return res.data;
};

// 2 decimal number function
export const floatingNumber = (offer_price, regular_price) => {
  let percentage = 100 - (100 * offer_price) / regular_price;
  percentage = Math.round(percentage);
  return percentage;
};
