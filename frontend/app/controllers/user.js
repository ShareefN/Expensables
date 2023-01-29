import { authenticateApi } from '../api/public';
import { initInstance, userApi } from '../api/private';
import { setUser } from '../features/userSlice';
import { dispatchAction } from '../utils/global_dispatch';
import { errorToast, successToast } from '../components/toast/toast';
import { errorMsg } from '../constants/error_messages';
import { storeUserToken, clearStorage } from '../utils/store_encryption';

export const authenticate = (number, next) => {
    authenticateApi({ number }).then(async ({ data }) => {
        storeUserToken(data.token)
        await initInstance(data.token);
        if (next) next();
    }).catch((error) => {
        errorToast(errorMsg[error?.code]?.title ?? '', errorMsg[error?.code]?.content ?? '')
    })
}

export const user = () => userApi().then(({ data }) => dispatchAction(setUser(data))).catch(error => clearStorage())

