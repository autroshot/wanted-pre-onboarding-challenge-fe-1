import { AxiosResponse } from 'axios';
import { createAxiosInstance } from 'utils/axios';

export async function login(email: string, password: string) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.post<
    PostResponseData,
    AxiosResponse<PostResponseData>,
    PostRequestData
  >('/jwt', { email, password });

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
  >('/users', { email, password });

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
