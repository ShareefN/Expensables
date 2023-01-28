import { loginApi, mobileAuthApi, mobileLoginApi, registerUserApi } from '../api/public';
import { userApi, updateUserApi, deleteUserApi, submitSupportApi, initInstance } from '../api/private';
import { setUser } from '../features/user/userSlice';
import { dispatchAction } from '../utils/global_dispatch';
import { errorToast, successToast } from '../components/toast/toast';
import { errorMsg } from '../constants/error_messages';
import { storeUserToken, clearStorage } from '../utils/store_encryption';
import { setLoading } from '../features/loading/loadingSlice';
import { start } from '../features/guide/guideSlice';

export const loginUser = (user, next) => {
    loginApi(user).then(async ({ data }) => {
        storeUserToken(data.token);
        await initInstance(data.token);
        if (next) next();
        dispatchAction(setUser(data))
    }).catch(error => {
        errorToast(errorMsg[error?.code]?.title ?? '', errorMsg[error?.code]?.content ?? '')
        if (next) next()
    })
}

export const loginUsingMobile = (phone, next) => {
    mobileLoginApi(phone).then(async ({ data }) => {
        storeUserToken(data.token);
        await initInstance(data.token);
        if (next) next();
        dispatchAction(setUser(data))
    }).catch(error => {
        errorToast(errorMsg[error?.code]?.title ?? '', errorMsg[error?.code]?.content ?? '')
        if (next) next()
    })
}

export const registerUser = async (user, next) => {
    registerUserApi(user).then(async ({ data }) => {
        storeUserToken(data.token);
        await initInstance(data.token);
        if (next) next();
        dispatchAction(start());
        dispatchAction(setUser(data))
    }).catch(error => {
        errorToast('Invalid credentials', 'Email already associated with another account')
        if (next) next()
    })
}

export const getUser = (next) => {
    userApi().then(({ data }) => {
        dispatchAction(setUser(data))
        if (next) next();
    }).catch(error => {
        errorToast(errorMsg[error.code].title, errorMsg[error.code].content)
        if (next) next();
    })
}

export const validatePhoneNumber = async (phone) => {
    try {
        await mobileAuthApi(phone);
        return 202
    } catch (error) {
        return 404
    }
}

export const updateUser = (data, next) => {
    dispatchAction(setLoading({ loading: true }))
    updateUserApi(data).then(({ data }) => {
        getUser(next)
        dispatchAction(setLoading({ loading: false }))
    }).catch(error => {
        dispatchAction(setLoading({ loading: false }))
        errorToast(errorMsg[error.code].title, errorMsg[error.code].content)
        if (next) next();
    })
}

export const deleteUser = () => {
    dispatchAction(setLoading({ loading: true }))
    deleteUserApi().then(({ data }) => {
        dispatchAction(setLoading({ loading: false }))
        clearStorage()
    }).catch(error => {
        dispatchAction(setLoading({ loading: false }))
        errorToast(errorMsg[error.code].title, errorMsg[error.code].content)
    })
}

export const submitSupprot = (data, next) => {
    submitSupportApi(data).then(({ data }) => {
        successToast('Message Received', 'Thank you for reaching out, We\'ll get back to you ASAP')
        if (next) next();
    }).catch((error) => {
        errorToast(errorMsg[error.code].title, errorMsg[error.code].content)
        if (next) next();
    })
}