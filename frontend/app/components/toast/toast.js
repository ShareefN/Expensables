import Toast from 'react-native-toast-message';

export const errorToast = (title, message) => {
    return (
        Toast.show({ type: 'error', text1: title, text2: message, position: 'top', topOffset: 60 })
    )
}

export const successToast = (title, message) => {
    return (
        Toast.show({ type: 'success', text1: title, text2: message, position: 'top', topOffset: 60 })
    )
}