import { parkingMessageApi, createParkingApi, checkParkingApi } from '../api/private';
import { dispatchAction } from '../utils/global_dispatch';
import { setLoading } from '../features/loading/loadingSlice';
import { errorToast } from '../components/toast/toast';

export const parkingMessage = async (parking) => {
    dispatchAction(setLoading({ loading: true }))
    let message;

    try {
        message = await parkingMessageApi(parking);
        dispatchAction(setLoading({ loading: false }))
        return message.data.rta_message
    } catch (error) {
        dispatchAction(setLoading({ loading: false }))
        return message
    }
}

export const createParking = async (parking, next) => {
    dispatchAction(setLoading({ loading: true }))

    try {
        await createParkingApi(parking);
        dispatchAction(setLoading({ loading: false }))
        if (next) next();
    } catch (error) {
        dispatchAction(setLoading({ loading: false }))
        errorToast('Free Parking', 'Free Overnight Parking')
        if (next) next();
    }
}

export const checkParking = async (parking) => {

    try {
        await checkParkingApi(parking);
        return 200
    } catch (error) {
        errorToast('Free Parking', 'Free Overnight Parking')
        return 400
    }
}