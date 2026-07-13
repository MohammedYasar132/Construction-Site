import API from "./api";

export const loginAdmin = async (credentials) => {
  const response = await API.post("/admin/login", credentials);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await API.get("/admin/stats");
  return response.data;
};
