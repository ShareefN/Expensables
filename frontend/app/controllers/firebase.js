import auth from '@react-native-firebase/auth';
import { dispatchAction } from '../utils/global_dispatch';
import { setLoading } from '../features/loadingSlice';
import { errorToast } from '../components/toast/toast';

export const sendOneTimePassword = async (phone) => {
    dispatchAction(setLoading({ loading: true }))
    try {
        const confirmation = await auth().signInWithPhoneNumber(phone);
        dispatchAction(setLoading({ loading: false }))
        return confirmation;
    } catch (error) {
        console.log(error)
        dispatchAction(setLoading({ loading: false }));
        errorToast('Too Many Request', 'You\'ve sent too many requests, Try again later!')
    }
}

export const confirmOneTimePassword = async (code, confirm) => {
    dispatchAction(setLoading({ loading: true }))
    try {
        await confirm.confirm(code);
        dispatchAction(setLoading({ loading: false }))
        return 200
    } catch (error) {
        dispatchAction(setLoading({ loading: false }))
        return 400
    }
}