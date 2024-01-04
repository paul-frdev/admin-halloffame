import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { BlogCategoryState } from '../types/store';

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blog-category/`);

  return response.data;
};

const getBlogCategoryId = async (id: string) => {
  const response = await axios.get(`${base_url}blog-category/${id}`);

  return response.data;
};

const createBlogCategory = async (category: BlogCategoryState) => {
  const response = await axios.post(`${base_url}blog-category/`, category, config);

  return response.data;
};


const deleteBlogCategory = async (id: string) => {
  const response = await axios.delete(`${base_url}blog-category/${id}`, config);

  return response.data;
};

const updateBlogCategory = async (category: BlogCategoryState) => {
  const response = await axios.put(`${base_url}blog-category/update/${category.category_id}`, { title: category.title }, config);

  return response.data;
};

const BlogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
  getBlogCategoryId
};


export default BlogCategoryService;
