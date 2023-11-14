import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { ColorsData } from '../types/store';

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);

  return response.data;
};
const createColor = async (color: ColorsData) => {
  const response = await axios.post(`${base_url}color/`, color, config);

  return response.data;
};

const updateColor = async (color: ColorsData) => {

  const response = await axios.put(`${base_url}color/${color.color_id}`, { color_name: color.color_name }, config);

  return response.data;
};
const getColor = async (id: string) => {
  const response = await axios.get(`${base_url}color/${id}`, config);

  return response.data;
};

const deleteColor = async (id: string) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);

  return response.data;
};
const colorService = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};

export default colorService;
