import api from './axiosInstance'; 

export const fetchProducts = async ({ page = 1, filters = {} }) => {
  const res = await api.get("/products", {
    params: { page, ...filters },
  });
  return res.data;
};