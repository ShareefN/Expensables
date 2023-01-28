import { getRegistrationsApi } from '../api/private';
import { dispatchAction } from '../utils/global_dispatch';
import { setRegistration } from '../features/registrations/registrationSlice';
import { setLoading } from '../features/loading/loadingSlice';

export const getRegistrations = () => {
    dispatchAction(setLoading({ loading: true }))
    getRegistrationsApi().then(({ data }) => {
        dispatchAction(setLoading({ loading: false }))
        dispatchAction(setRegistration(data))
    }).catch((error) => { dispatchAction(setLoading({ loading: false })) })
}


