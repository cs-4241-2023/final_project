import axios from 'axios';
import { Bio } from '../types/bio.types';


class BioService {
    async send(data: Bio) {
        try {
            const response = await axios.post('/add', data);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    }
}

export const bioService = new BioService();