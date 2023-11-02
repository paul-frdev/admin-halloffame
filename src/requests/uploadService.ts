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

const updateImage = async (data: any) => {
  
  console.log('data', data);
  const response = await axios.post(`${base_url}image/text`, data, config);

  return response.data;
};

const uploadService = {
  uploadImage,
  deleteImage,
  updateImage,
};

export default uploadService;
