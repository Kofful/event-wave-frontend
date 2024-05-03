import axios from 'axios';
import { apiBase } from './index';

export const getEvents = async (params) => {
  return await axios.get(`${apiBase}/events`, { params });
};
