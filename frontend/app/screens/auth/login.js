import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { loginUser, validatePhoneNumber, loginUsingMobile } from '../../controllers/user';
import { styles } from '../../constants/styles';
import MainButton from '../../components/buttons/main_button';
import IconButton from '../../components/buttons/icon_button';
import LoginIcon from '../../assets/auth/login.svg';
import EmailAuthentication from '../../components/forms/auth/email_login';
import PhoneAuthntication from '../../components/forms/auth/phone';
import { routes } from '../../constants/routes';
import OrDivider from '../../components/dividers/or_divider';
import OtpValidation from '../../components/forms/otp_verification';
import { errorToast } from '../../components/toast/toast';
import { sendOneTimePassword, confirmOneTimePassword, logEvent } from '../../controllers/firebase';
import { emailVaidation } from '../../utils/regex';
import ActionText from '../../components/buttons/action_text';
import { unifyMobileNumber } from '../../utils/helpers';

function Login({ navigation }) {
    const [user, setUser] = useState({
        email: null,
        password: null,
        phone: null
    })
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState(false);
    const [phoneAuthView, setPhoneAuthView] = useState(0);
    const [verificationId, setVerficationId] = useState(null);

    onInputChange = (key, value) => {
        setUser({ ...user, [key]: value })
    }

    onForgotPasswordPress = () => {
        navigation.navigate(routes.forgot);
    }

    onLoginPress = () => {
        if (loginType) loginUsingEmail()
        else validateUserPhone()
    }

    toggleView = () => {
        setPhoneAuthView(0)
        setLoginType(!loginType)
    }

    loginUsingEmail = () => {
        const { email, password } = user;

        if (!(email && password)) {
            return errorToast('Invalid Entries', 'Please enter your email and password to login')
        }

        if (!emailVaidation(email)) {
            return errorToast('Invalid Entry', 'The email you\'ve entered is invalid')
        }

        setLoading(true);

        loginUser({ email, password }, () => {
            logEvent('login_using_email', { email })
            setLoading(false)
        })
    }

    validateUserPhone = async () => {
        if (user.phone === null) return

        onInputChange('phone', unifyMobileNumber(user.phone))

        setLoading(true)
        let _result = await validatePhoneNumber(unifyMobileNumber(user.phone));

        if (_result === 202) {
            let _confirm = await sendOneTimePassword(unifyMobileNumber(user.phone));
            setLoading(false)
            if (_confirm.verificationId) {
                setVerficationId(_confirm);
                setPhoneAuthView(1)
            } else setLoading(false);
        } else {
            setLoading(false)
            errorToast('User Not Found', `${user.phone} is not associated with any account`)
        }
    }

    submitOTP = async (code) => {
        setLoading(true);
        let _result = await confirmOneTimePassword(code, verificationId)
        if (_result === 200) {
            loginUsingMobile(unifyMobileNumber(user.phone), () => {
                logEvent('login_using_phone', { phone: unifyMobileNumber(user.phone) })
                setLoading(false)
            })
        }
        else errorToast('Invalid Code', `The code you've sent is invalid, Try Again`)
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardDismissMode={"on-drag"}>
            <View style={styles.logo_container}>
                <LoginIcon width={150} height={150} />
            </View>
            {loginType ?
                <EmailAuthentication email={user.email} password={user.password} forgot={() => onForgotPasswordPress()} change={(key, value) => onInputChange(key, value)} />
                : phoneAuthView === 0 ? <PhoneAuthntication phone={user.phone} change={(key, value) => onInputChange(key, value)} /> : <OtpValidation number={user.phone} resend={() => validateUserPhone()} submit={(code) => submitOTP(code)} />}
            {phoneAuthView === 0 ? <MainButton title="Login" loading={loading} action={() => onLoginPress()} /> : null}
            {phoneAuthView === 1 ? null : <OrDivider />}
            {loginType ? <IconButton title="Login with Mobile Number" icon={"cellphone-key"} action={() => toggleView()} /> : <IconButton title="Login with Email & Password" icon={"at"} action={() => toggleView()} />}
            <View style={styles.dead_container} />
            <MainButton title="New to PerkyParker? Register" action={() => navigation.navigate(routes.register)} />
            <View style={styles.dead_container} />
            <ActionText title="Terms & Conditions" action={() => navigation.navigate(routes.terms)} />
        </ScrollView>
    );
}



export default Login;