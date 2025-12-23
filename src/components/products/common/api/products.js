import axios from "axios";

export const fetchProducts = ({
  page = 1,
  limit = 1000,
  category,        // ✅ VERY IMPORTANT
  filters = {},
} = {}) => {
  return axios.get("/products", {
    params: {
      page,
      limit,
      category,     // ✅ backend ko yahin bhej rahe hain
      ...filters,
    },
  });
};