import axios from 'axios';
import { apiBase } from './index';

export const login = async (data) => {
  return await axios.post(`${apiBase}/login`, data);
};
export const register = async (data) => {
  return await axios.post(`${apiBase}/register`, data);
};
