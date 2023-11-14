import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { WeightsData } from '../types/store';

const getWeights = async () => {
  const response = await axios.get(`${base_url}weight/`);

  return response.data;
};
const createWeight = async (weight: WeightsData) => {
  const response = await axios.post(`${base_url}weight/`, weight, config);

  return response.data;
};

const updateWeight = async (weight: WeightsData) => {
  const response = await axios.put(`${base_url}weight/${weight.weight_id}`, { weight_name: weight.weight_name }, config);

  return response.data;
};
const getWeight = async (id: string) => {
  const response = await axios.get(`${base_url}weight/${id}`, config);

  return response.data;
};

const deleteWeight = async (id: string) => {
  const response = await axios.delete(`${base_url}weight/${id}`, config);

  return response.data;
};
const weightService = {
  getWeights,
  createWeight,
  updateWeight,
  getWeight,
  deleteWeight,
};

export default weightService;
