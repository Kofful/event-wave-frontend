import axios from 'axios';
import { apiBase } from './index';

export const getEvents = async (params) => {
  return await axios.get(`${apiBase}/events`, { params });
};

export const getEvent = async (id) => {
  return await axios.get(`${apiBase}/events/${id}`);
};

export const createEvent = async (data, token) => {
  return await axios.post(`${apiBase}/events`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });
};

export const updateEvent = async (id, data, token) => {
  return await axios.post(`${apiBase}/events/${id}`,
    {
      ...data,
      _method: 'PUT',
    },
    {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
