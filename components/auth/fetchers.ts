import axios, { AxiosResponse } from 'axios';

export async function login(email: string, password: string) {
  const res = await axios.post<
    PostResponseData,
    AxiosResponse<PostResponseData>,
    PostRequestData
  >('/api/jwt', { email, password });

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
  const res = await axios.post<
    PostResponseData,
    AxiosResponse<PostResponseData>,
    PostRequestData
  >('/api/users', { email, password });

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
