import axios from 'axios';
import { apiBase } from './index';

export const getEvents = async (params) => {
  return await axios.get(`${apiBase}/events`, { params });
};

export const createEvent = async (data, token) => {
  return await axios.post(`${apiBase}/events`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });
}
