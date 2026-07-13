import API from "./api";

export const getTestimonials = async () => {
  const response = await API.get("/testimonials");
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const response = await API.post("/testimonials", testimonialData);
  return response.data;
};
