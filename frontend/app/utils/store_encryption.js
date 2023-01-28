import EncryptedStorage from 'react-native-encrypted-storage';
import { USER_TOKEN_KEY } from "@env"
import { dispatchAction } from './global_dispatch';
import { clearUser } from '../features/user/userSlice';
import { clearVehicles } from '../features/vehicles/vehiclesSlice';

export const storeUserToken = async (token) => {
    try {
        await EncryptedStorage.setItem(
            USER_TOKEN_KEY,
            JSON.stringify(token)
        )
    } catch (error) {
        clearStorage();
        console.log(`Store user token error: ${error}`)
    }
}

export const retreiveUserToken = async () => {
    return await EncryptedStorage.getItem(USER_TOKEN_KEY)
}

export const clearStorage = async () => {
    dispatchAction(clearUser());
    dispatchAction(clearVehicles())
    return await EncryptedStorage.clear();
}