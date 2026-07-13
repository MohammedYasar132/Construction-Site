import API from "./api";

export const createInquiry = async (inquiryData) => {
  const response = await API.post("/appointments", inquiryData);
  return response.data;
};

export const getInquiries = async () => {
  const response = await API.get("/appointments");
  return response.data;
};
