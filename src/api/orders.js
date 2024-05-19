import axios from 'axios';
import { apiBase } from './index';

export const getUserOrders = async (token) => {
  return await axios.get(`${apiBase}/my_orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
};
