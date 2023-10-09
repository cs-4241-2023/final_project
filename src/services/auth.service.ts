import axios, { AxiosError } from 'axios';
import { LoginData, RegisterData } from '../types/auth.types';

class AuthService {
  async login(data: LoginData) {
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

  async register(data: RegisterData) {
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
}

export const authService = new AuthService();
