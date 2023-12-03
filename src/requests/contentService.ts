import { AboutUsProps, ContactsProps, RefundProps } from '../types/store';
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

const getAboutUs = async () => {
  const response = await axios.get(`${base_url}about`, config);

  return response.data;
};

const updateAbout = async (about: AboutUsProps) => {
  const response = await axios.put(
    `${base_url}about/${about.about_id}`,
    { about_title: about.about_title, about_description: about.about_description },
    config
  );

  return response.data;
};

// TODO contacts requests
const createContact = async (contacts: ContactsProps) => {
  const response = await axios.post(`${base_url}contacts/`, contacts, config);

  return response.data;
};

const getContactId = async (id: string) => {
  const response = await axios.get(`${base_url}contacts/${id}`, config);

  return response.data;
};

const getContacts = async () => {
  const response = await axios.get(`${base_url}contacts`, config);

  return response.data;
};

const updateContacts = async (contacts: ContactsProps) => {
  const response = await axios.put(
    `${base_url}contacts/${contacts.contacts_id}`,
    {
      contacts_title: contacts.contacts_title,
      contacts_address: contacts.contacts_address,
      contacts_email: contacts.contacts_email,
      contacts_phone: contacts.contacts_phone,
    },
    config
  );

  return response.data;
};

// TODO get a refund
const createRefund = async (refund: RefundProps) => {
  const response = await axios.post(`${base_url}refund/`, refund, config);

  return response.data;
};

const getRefundId = async (id: string) => {
  const response = await axios.get(`${base_url}refund/${id}`, config);

  return response.data;
};

const getRefund = async () => {
  const response = await axios.get(`${base_url}refund`, config);

  return response.data;
};

const updateRefund = async (refund: RefundProps) => {
  
  const response = await axios.put(
    `${base_url}refund/${refund.refund_id}`,
    {
      refund_text: refund.refund_text,
    },
    config
  );

  return response.data;
};

const contentService = {
  getAbout,
  createAboutUs,
  updateAbout,
  getAboutUs,
  createContact,
  getContactId,
  getContacts,
  updateContacts,
  createRefund,
  getRefundId,
  getRefund,
  updateRefund,
};

export default contentService;
