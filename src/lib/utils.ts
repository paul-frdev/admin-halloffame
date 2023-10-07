import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const base_url = 'http://localhost:5000/';

const getTokenFromLocalStorage = localStorage.getItem('user') ? JSON.parse(JSON.stringify(localStorage.getItem("user"))) : null;

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.user : ''}`,
    Accept: 'application/json',
  },
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
