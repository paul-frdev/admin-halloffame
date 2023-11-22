import axios from 'axios';
import { base_url, config } from '../lib/utils';
import { TestimonialProps } from '../types/store';

const createTestimonial = async (testimonial: TestimonialProps) => {
  const response = await axios.post(`${base_url}testimonial/`, testimonial, config);

  return response.data;
};

const getTestimonials = async () => {
  const response = await axios.get(`${base_url}testimonial/`);

  return response.data;
};

const getTestimonial = async (id: string) => {
  const response = await axios.get(`${base_url}testimonial/${id}`, config);

  return response.data;
};

const deleteTestimonial = async (id: string) => {
  const response = await axios.delete(`${base_url}testimonial/${id}`, config);

  return response.data;
};

const testimonialService = {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  deleteTestimonial,
};

export default testimonialService;
