import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { BrandsData } from '../types/store';

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);

  return response.data;
};
const createBrand = async (brand: BrandsData) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);

  return response.data;
};

const updateBrand = async (brand: BrandsData) => {
  const response = await axios.put(`${base_url}brand/${brand.brand_id}`, { brand_name: brand.brand_name }, config);

  return response.data;
};
const getBrand = async (id: string) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);

  return response.data;
};

const deleteBrand = async (id: string) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);

  return response.data;
};
const brandService = {
  getBrands,
  createBrand,
  updateBrand,
  getBrand,
  deleteBrand,
};

export default brandService;
