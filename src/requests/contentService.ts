import { AboutUsProps } from '../types/store';
import axios from 'axios';
import { base_url, config } from '../lib/utils';

// TODO about-us
const createAboutUs = async (about: AboutUsProps) => {
  const response = await axios.post(`${base_url}about/`, about, config);

  return response.data;
};

const getAbout = async (id: string) => {
  const response = await axios.get(`${base_url}about/${id}`, config);

  return response.data;
};

const updateAbout = async (about: AboutUsProps) => {
  const response = await axios.put(`${base_url}about/${about.about_id}`, { title: about.about_title, description: about.about_description }, config);

  return response.data;
};

// TODO contacts
// TODO get a refund
const contentService = {
  getAbout,
  createAboutUs,
  updateAbout,
};

export default contentService;
