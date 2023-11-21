import axios from 'axios';
import { base_url, config } from '../lib/utils';

const uploadImage = async (data: any) => {
  const response = await axios.post(`${base_url}image/`, data, config);
  return response.data;
};

const deleteImage = async (id: string | undefined) => {
  const response = await axios.delete(`${base_url}image/delete-img/${id}`, config);
  return response.data;
};

const getImageById = async (id: string) => {
  console.log('id', id);
  
  const response = await axios.get(`${base_url}image/get-image/${id}`, config);

  console.log('response', response);
  
  return response.data;
};

const uploadService = {
  uploadImage,
  deleteImage,
  getImageById,
};

export default uploadService;
