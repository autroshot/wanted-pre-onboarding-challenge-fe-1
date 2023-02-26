import axios, { AxiosResponse } from 'axios';

export async function login(email: string, password: string) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.post<
    PostResponseData,
    AxiosResponse<PostResponseData>,
    PostRequestData
  >('/users/login', { email, password });

  return res.data;

  interface PostRequestData {
    email: string;
    password: string;
  }

  interface PostResponseData {
    message: string;
    token: string;
  }
}

export async function signup(email: string, password: string) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.post<
    PostResponseData,
    AxiosResponse<PostResponseData>,
    PostRequestData
  >('/users/create', { email, password });

  return res.data;

  interface PostRequestData {
    email: string;
    password: string;
  }

  interface PostResponseData {
    message: string;
    token: string;
  }
}

function createAxiosInstance() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });
}
