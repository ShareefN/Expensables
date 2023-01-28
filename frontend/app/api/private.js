import { BASE_URL } from "@env"
import axios from 'axios';
import { Platform } from "react-native";

let instance = null;

export const initInstance = (token) => {
    instance = axios.create({
        baseURL: BASE_URL,
        timeout: 4000,
        headers: {
            authorization: `Bearer ${token}`,
            platform: Platform.OS
        }
    })
}

export const userApi = () => {
    return instance.get('private/users')
}

export const getVehiclesApi = () => {
    return instance.get('/vehicle/')
}

export const updateUserApi = (user) => {
    if (user == null) return;
    return instance.put('/private/users', user)
}

export const getRegistrationsApi = () => {
    return instance.get('/registration')
}

export const createVehicleApi = (data) => {
    return instance.post('/vehicle', data)
}

export const editVehicleApi = (id, data) => {
    return instance.put(`/vehicle/${id}`, data)
}

export const deleteVehicleApi = (id) => {
    return instance.delete(`/vehicle/${id}`)
}

export const deleteUserApi = () => {
    return instance.delete('/private/users')
}

export const submitSupportApi = (data) => {
    return instance.post('/support', data);
}

export const getZonesApi = () => {
    return instance.get('/zone')
}

export const getZoneApi = (id) => {
    return instance.get(`/zone/${id}`)
}

export const parkingMessageApi = (parking) => {
    return instance.post('/parking/generate/rta/message', parking);
}

export const createParkingApi = (parking) => {
    return instance.post('/parking', parking)
}

export const checkParkingApi = (parking) => {
    return instance.post('/parking/check', parking)
}

export const getHistoryApi = (hide) => {
    return instance.get(`/parking/${hide}`);
}

export const setHistoryItemApi = (id, hide) => {
    return instance.put(`/parking/${id}`, hide)
}

export const getZoneByCharApi = (char) => {
    return instance.post('/zone/zone_char', { zone_char: char })
}

export const sharableLinksApi = () => {
    return instance.get('/links/sharables')
}