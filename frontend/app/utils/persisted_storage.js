import { USER_FIRST_LAUNCH, USER_FIRST_PARKING } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setFirstparking = async () => {
    try {
        await AsyncStorage.setItem(USER_FIRST_PARKING, 'true')
    } catch (e) {
        console.log('Error saving first parking', e)
    }
}

export const readFirstParking = async () => {
    try {
        return await AsyncStorage.getItem(USER_FIRST_PARKING);
    } catch (e) {
        console.log('Error reading first parking', e)
    }
}