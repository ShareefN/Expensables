import { COLLECTION_ID } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeCollectionId = async (collectionId) => {
    console.log('Storing collection Id: ', collectionId)
    try {
        await AsyncStorage.setItem(COLLECTION_ID, collectionId)
    } catch (e) {
        console.log('error saving collection Id', e)
    }
}

export const readCollectionId = async () => {
    try {
        return await AsyncStorage.getItem(COLLECTION_ID);
    } catch (e) {
        console.log('Error reading collection Id', e)
    }
}