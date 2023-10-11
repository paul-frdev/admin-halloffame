import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { BlogCategoryState } from '../types/store';

export const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blog-category/`);

  return response.data;
};

export const createBlogCategory = async (category: BlogCategoryState) => {
  const response = await axios.post(`${base_url}blog-category/`, category, config);

  return response.data;
};
