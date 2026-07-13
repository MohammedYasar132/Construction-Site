import API from "./api";

export const getBlogs = async () => {
  const response = await API.get("/blogs");
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await API.get(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await API.post("/blogs", blogData);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await API.put(`/blogs/${id}`, blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await API.delete(`/blogs/${id}`);
  return response.data;
};
