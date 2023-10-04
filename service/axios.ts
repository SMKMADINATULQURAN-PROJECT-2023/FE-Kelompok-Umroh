require('dotenv').config();
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { parse, stringify } from 'qs';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5002',
  // baseURL: 'http://172.16.80.13:5002',
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
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
