import axios, { type AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  withCredentials: true,
});

export const publicAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
});
