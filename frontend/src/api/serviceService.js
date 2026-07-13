import API from "./api";

export const getServices = async () => {
  const response = await API.get("/services");
  return response.data;
};

export const getServiceById = async (id) => {
  const response = await API.get(`/services/${id}`);
  return response.data;
};
