import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9000/api', // Adjust the port to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
