import axios from 'axios';
import { Create } from '../types/create.types';


class CreateService {

    async saveData(data: Create) {
        try {
            const response = await axios.post('/add', data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    }
}

export const createService = new CreateService();