import axios, { AxiosError } from "axios";

class DeleteService {
  async deleteData(data: string) {
    try {
      const response = await axios.post("/delete", { characterId: data });
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

export const deleteService = new DeleteService();
