import axios from "axios";
import {} from "../types/character.types";
import { User } from "../types/auth.types";

class DashboardService {
  async getCharacters(user: User) {
    try {
      const response = await axios.post("/getCharacters", user);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

export const authService = new DashboardService();
