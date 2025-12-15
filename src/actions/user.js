import { api } from "@/api";

export const fetchUser = async () => {
    const res = await api.get(`/users/current`);
    return res.data;
};