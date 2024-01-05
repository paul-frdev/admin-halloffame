import axios from 'axios';
import { base_url } from '../lib/utils';

const login = async (user: any) => {
  const response = await axios.post(`${base_url}login`, user);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const authorize = async () => {
  try {
    const response = await axios.post(`${base_url}authorize`, null, {
      headers: { jwt_token: localStorage.user },
    });
    return response.data;
  } catch (error) {
    console.error('Authorization error:', error);
    throw error;
  }
};

const authService = {
  login,
  authorize,
};

export default authService;
