import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { CategoriesData } from '../types/store';

const getCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};
const createCategory = async (category: CategoriesData) => {

  console.log('category', category);
  const response = await axios.post(`${base_url}category/`, category, config);

  console.log('response', response);
  
  return response.data;
};

const updateCategory = async (category: CategoriesData) => {
  const response = await axios.put(`${base_url}category/${category.category_id}`, { category_name: category.category_name }, config);

  return response.data;
};
const getCategory = async (id: string) => {
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};

const deleteCategory = async (id: string) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);

  return response.data;
};
const categoryService = {
  getCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};

export default categoryService;
