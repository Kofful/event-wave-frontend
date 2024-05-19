import axios from 'axios';
import { apiBase } from './index';

export const createOrder = async (data) => {
  return await axios.post(`${apiBase}/orders`, data)
};
