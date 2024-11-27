// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getCustomers = async () => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};

// Add more functions for other CRUD operations