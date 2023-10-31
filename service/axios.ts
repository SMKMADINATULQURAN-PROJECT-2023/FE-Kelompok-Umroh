import axios, { AxiosInstance } from 'axios';

export const axiosClient: AxiosInstance = axios.create({
  // baseURL: 'http://172.16.80.118:5002',
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    page: number;
    limit: number;
    pageSize: number;
    total: number;
  };
}
