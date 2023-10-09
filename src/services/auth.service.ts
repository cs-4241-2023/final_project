import axios, { AxiosError } from 'axios';
import { LoginData, RegisterData, User } from '../types/auth.types';

class AuthService {
  async login(data: LoginData): Promise<User> {
    try {
      const response = await axios.post('/login', data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.response && typeof axiosError.response.data === 'string' ?
          axiosError.response.data :
          axiosError.message
      );
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      const response = await axios.post('/register', data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.response && typeof axiosError.response.data === 'string' ?
          axiosError.response.data :
          axiosError.message
      );
    }
  }

  async checkUsername(username: string): Promise<boolean | string> {
    try {
      const response = await axios.post('/checkUsername', { username });
      console.log("Response", response)
      return response.status === 200;
    } catch (error) {
      const axiosError = error as AxiosError;
      return (
        axiosError.response && typeof axiosError.response.data === 'string' ?
          axiosError.response.data :
          axiosError.message
      );
    }
  }
}

export const authService = new AuthService();
