import { TicketProps } from '../types/store';
import axios from 'axios';
import { base_url, config } from '../lib/utils';

const getTickets = async () => {
  const response = await axios.get(`${base_url}ticket/`);

  return response.data;
};

const getTicket = async (id: string) => {
  const response = await axios.get(`${base_url}ticket/${id}`, config);

  return response.data;
};

const createTicket = async (ticket: TicketProps) => {
  const response = await axios.post(`${base_url}ticket/`, ticket, config);

  return response.data;
};

const deleteTicket = async (id: string) => {
  const response = await axios.delete(`${base_url}ticket/${id}`, config);

  return response.data;
};

const ticketService = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket
};

export default ticketService;
