import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { authenticate } from '../../controllers/user';
import { styles } from '../../constants/styles';
import MainButton from '../../components/buttons/main_button';
import LoginIcon from '../../assets/auth/login.svg';
import PhoneAuthntication from '../../components/forms/auth/phone';
import OtpValidation from '../../components/forms/otp_verification';
import { errorToast } from '../../components/toast/toast';
import { sendOneTimePassword, confirmOneTimePassword } from '../../controllers/firebase';
import { unifyMobileNumber } from '../../utils/helpers';
import ActionText from '../../components/buttons/action_text';
import { routes } from '../../constants/routes';

function Login({ navigation }) {
    const [user, setUser] = useState({
        phone: null
    })
    const [loading, setLoading] = useState(false);
    const [phoneAuthView, setPhoneAuthView] = useState(0);
    const [verificationId, setVerficationId] = useState(null);

    onInputChange = (key, value) => {
        setUser({ ...user, [key]: value })
    }

    validateUserPhone = async () => {
        if (user.phone === null) return

        onInputChange('phone', unifyMobileNumber(user.phone))

        setLoading(true)

        let _verify = await sendOneTimePassword(unifyMobileNumber(user.phone));

        setLoading(false)

        if (_verify.verificationId) {
            setVerficationId(_verify);
            return setPhoneAuthView(1);
        }

        errorToast('Communication Issue', `There was an issue verifying ${user.phone}, Try again!`)

    }

    submitOTP = async (code) => {
        setLoading(true);
        let _result = await confirmOneTimePassword(code, verificationId)

        if (_result == 200) return authenticate(unifyMobileNumber(user.phone), () => setLoading(false))

        errorToast('Invalid Code', `The code you've sent is invalid, Try Again`)
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardDismissMode={"on-drag"}>
            <View style={styles.logo_container}>
                <LoginIcon width={150} height={150} />
            </View>
            {phoneAuthView === 0 ? <PhoneAuthntication phone={user.phone} change={(key, value) => onInputChange(key, value)} /> : <OtpValidation number={user.phone} resend={() => validateUserPhone()} submit={(code) => submitOTP(code)} />}
            {phoneAuthView === 0 ? <MainButton title="Authenticate" loading={loading} action={() => validateUserPhone()} /> : null}
            <View style={styles.dead_container} />
            <ActionText title="Terms & Conditions" action={() => navigation.navigate(routes.terms)} />
        </ScrollView>
    );
}



export default Login;