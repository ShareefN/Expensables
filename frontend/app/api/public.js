import { BASE_URL } from "@env"
import axios from 'axios';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 4000,
});

export const loginApi = (user) => {
    return instance.post('public/users/auth', user)
}

export const mobileLoginApi = (phone) => {
    return instance.post('public/users/mobile/login', { phone })
}

export const registerApi = (user) => {
    return instance.post('public/', user)
}

export const mobileAuthApi = (phone) => {
    return instance.post('public/users/mobile/auth', { phone })
}

export const registerUserApi = (user) => {
    return instance.post('public/users/', user)
}