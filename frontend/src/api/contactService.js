import API from "./api";

export const createContactInquiry = async (contactData) => {
  const response = await API.post("/appointments", contactData);
  return response.data;
};

export const sendContact = async (contactData) => {
  const response = await API.post("/appointments", contactData);
  return response.data;
};
