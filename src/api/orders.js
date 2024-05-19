import axios from 'axios';
import { apiBase } from './index';

export const createOrder = async (data) => {
  return await axios.post(`${apiBase}/orders`, data)
};

export const getUserOrders = async (token) => {
  return await axios.get(`${apiBase}/my_orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const makeRefund = async (orderId, token) => {
  return await axios.put(`${apiBase}/orders/${orderId}/refund`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
