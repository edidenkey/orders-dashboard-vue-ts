import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export const client = axios.create({
  baseURL: API_URL,
  timeout: 10000
})
