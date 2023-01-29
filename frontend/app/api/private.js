import { BASE_URL } from "@env"
import axios from 'axios';

let instance = null;

export const initInstance = (token) => {
    instance = axios.create({
        baseURL: BASE_URL,
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

export const aggregatorApi = (payload) => {
    return instance.post('/aggregator/', payload)
}

export const getExpensesApi = (collectionId, type) => {
    return instance.post(`/expenses/${collectionId}/${type}`)
}

export const getCollectionsApi = () => {
    return instance.get('/collections/')
}