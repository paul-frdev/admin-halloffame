import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { SizesData } from '../types/store';

const getSizes = async () => {
  const response = await axios.get(`${base_url}size/`);

  return response.data;
};
const createSize = async (size: SizesData) => {
  const response = await axios.post(`${base_url}size/`, size, config);

  return response.data;
};

const updateSize = async (size: SizesData) => {

  const response = await axios.put(`${base_url}size/${size.sizes_id}`, { size_name: size.size_name }, config);

  return response.data;
};
const getSize = async (id: string) => {
  const response = await axios.get(`${base_url}size/${id}`, config);

  return response.data;
};

const deleteSize = async (id: string) => {
  const response = await axios.delete(`${base_url}size/${id}`, config);

  return response.data;
};
const sizeService = {
  getSizes,
  createSize,
  updateSize,
  getSize,
  deleteSize,
};

export default sizeService;