import { BASE_URL } from "@env"
import axios from 'axios';

let instance = null;

export const initInstance = (token) => {
    instance = axios.create({
        baseURL: 'http://192.168.1.161:3030',
        timeout: 4000,
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const userApi = () => {
    return instance.get('/users/')
}

export const categoriesApi = () => {
    return instance.get('/categories/')
}

