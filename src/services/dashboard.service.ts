import axios, { AxiosError } from "axios";
import {} from "../types/character.types";
import { User } from "../types/auth.types";

class DashboardService {
  async getCharacters(user: User) {
    try {
      const response = await axios.post("/getCharacters", user.username);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.response && typeof axiosError.response.data === "string"
          ? axiosError.response.data
          : axiosError.message
      );
    }
  }
}

export const authService = new DashboardService();
