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

const updateTestimonial = async (testimonial: TestimonialProps) => {
  const response = await axios.put(
    `${base_url}testimonial/${testimonial.testimonial_id}`,
    { image: testimonial.image, desriptiontext: testimonial.desriptiontext, author: testimonial.author, dignity: testimonial.dignity },
    config
  );

  return response.data;
};

const updateIsActiveTestimonial = async (id: string) => {
  const response = await axios.put(`${base_url}testimonial/active/${id}`, config);

  return response.data;
};

// get tags
const getAdminTag = async () => {
  const response = await axios.get(`${base_url}tags/admin`);
  return response.data;
};

const testimonialService = {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  deleteTestimonial,
  updateIsActiveTestimonial,
  updateTestimonial,
  getAdminTag,
};

export default testimonialService;
