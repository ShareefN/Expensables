import { BASE_URL } from "@env"
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.161:3030',
    timeout: 4000,
});

export const authenticateApi = (user) => {
    return instance.post('/users/', user)
}
