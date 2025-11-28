import axios from "axios";

  const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default api;