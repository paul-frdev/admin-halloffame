import { EventProps } from '../types/store';
import axios from 'axios';
import { base_url, config } from '../lib/utils';

const getEvents = async () => {
  const response = await axios.get(`${base_url}event/`);

  return response.data;
};

const getEvent = async (id: string) => {
  const response = await axios.get(`${base_url}event/${id}`, config);

  return response.data;
};

const createEvent = async (event: EventProps) => {
  const response = await axios.post(`${base_url}event/`, event, config);

  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
  getEvent,
};

export default eventService;
