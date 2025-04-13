import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Change this if your backend runs on a different port
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
