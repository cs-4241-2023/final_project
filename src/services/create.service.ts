import axios, { AxiosError } from "axios";
import { Create, Update } from "../types/create.types";

class CreateService {
  async saveData(data: Create) {
    try {
      const response = await axios.post("/add", data);
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

  async updateData(data: Update) {
    try {
      const response = await axios.post("/update", data);
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

export const createService = new CreateService();
