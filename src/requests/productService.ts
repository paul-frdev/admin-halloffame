import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { ProductData } from '../types/store';

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product: ProductData) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);

  return response.data;
};

const getTags = async () => {
  const response = await axios.get(`${base_url}tags/`);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getTags,
  deleteProduct,
};

export default productService;
