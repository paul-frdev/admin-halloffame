import axios from 'axios';
import { base_url, config } from '../lib/utils';

const uploadImage = async (data: any) => {
  const response = await axios.post(`${base_url}upload-image/`, data, config);
  return response.data;
};

const uploadService = {
  uploadImage,
};

export default uploadService;
