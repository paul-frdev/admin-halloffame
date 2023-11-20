import { SlideProps, TicketProps } from '../types/store';
import axios from 'axios';
import { base_url, config } from '../lib/utils';

const getSlides = async () => {
  const response = await axios.get(`${base_url}slides/`);

  return response.data;
};

const getSlide = async (id: string) => {
  const response = await axios.get(`${base_url}slides/${id}`, config);

  return response.data;
};

const createSlide = async (slide: SlideProps) => {
  const response = await axios.post(`${base_url}slides/`, slide, config);

  return response.data;
};

const deleteSlide = async (id: string) => {
  const response = await axios.delete(`${base_url}slides/${id}`, config);

  return response.data;
};

const updateSlide = async (slide: SlideProps) => {
  const response = await axios.put(`${base_url}slide/${slide.slide_id}`, { title: slide.title, image: slide.slide_image, slideType: slide.type }, config);

  return response.data;
};

const ticketService = {
  getSlides,
  getSlide,
  createSlide,
  deleteSlide,
  updateSlide,
};

export default ticketService;
