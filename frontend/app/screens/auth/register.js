import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Animated, Dimensions } from 'react-native';
import { styles } from '../../constants/styles';
import RegisterLogo from '../../assets/auth/register.svg';
import PhoneRegister from '../../components/forms/auth/phone_register';
import UserData from '../../components/forms/auth/user_data';
import MainButton from '../../components/buttons/main_button';
import IconButton from '../../components/buttons/icon_button';
import OrDivider from '../../components/dividers/or_divider';
import OtpValidation from '../../components/forms/otp_verification';
import { routes } from '../../constants/routes';
import { validatePhoneNumber, registerUser } from '../../controllers/user';
import { sendOneTimePassword, confirmOneTimePassword, logEvent } from '../../controllers/firebase';
import { errorToast } from '../../components/toast/toast';
import { emailVaidation, passwordValidation } from '../../utils/regex';
import ActionText from '../../components/buttons/action_text';
import { unifyMobileNumber } from '../../utils/helpers';

export default function Register({ navigation }) {
    const height = useRef(new Animated.Value(Dimensions.get('window').height)).current
    const [loading, setLoading] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [user, setUser] = useState({
        phone: null,
        email: null,
        username: null,
        password: null,
    })
    const [verificationId, setVerficationId] = useState(null);

    useEffect(() => {
        Animated.timing(
            height,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }
        ).start();
    }, [height])

    onInputChange = (key, value) => {
        setUser({ ...user, [key]: value })
    }

    validateUserPhone = async () => {
        if (user.phone === null) return

        onInputChange('phone', unifyMobileNumber(user.phone))

        setLoading(true)
        let _result = await validatePhoneNumber(unifyMobileNumber(user.phone));
        if (_result === 404) {
            let _confirm = await sendOneTimePassword(unifyMobileNumber(user.phone));;
            setLoading(false)
            if (_confirm?.verificationId) {
                setVerficationId(_confirm);
                setStepIndex(1)
            } else {
                errorToast('Inpropper Number', `Please add country code`)
                setLoading(false);
            }
        } else {
            setLoading(false)
            errorToast('User Already Exists', `${unifyMobileNumber(user.phone)} is associated with an account`)
        }
    }

    submitOTP = async (code) => {
        setLoading(true);
        let _result = await confirmOneTimePassword(code, verificationId);
        setLoading(false)
        if (_result === 200) setStepIndex(2)
        else errorToast('Invalid Code', `The code you've sent is invalid, Try Again`)
    }

    onRegisterPress = () => {
        const { email, password } = user;

        if (!(email && password)) {
            return errorToast('Invalid Entries', 'Email & password are required to register account')
        }

        if (!emailVaidation(email)) {
            return errorToast('Invalid Entry', 'The email you\'ve entered is invalid')
        }

        if (!passwordValidation(password)) {
            return errorToast('Weak Password', 'The password you\'ve provided is weak')
        }

        setLoading(true)
        registerUser(user, () => {
            logEvent('sign_up', { email: user.email, phone: unifyMobileNumber(user.phone) })
            setLoading(false)
        })
    }

    const renderContent = () => {
        if (stepIndex === 0) {
            return (
                <>
                    <PhoneRegister phone={user.phone} change={(key, value) => onInputChange(key, value)} />
                    <MainButton title="Verify Mobile Number" loading={loading} action={() => validateUserPhone()} />
                    <OrDivider />
                    <IconButton title="Joined us before? Login" action={() => navigation.navigate(routes.login)} />
                    <View style={styles.dead_container} />
                    <ActionText title="Terms & Conditions" action={() => navigation.navigate(routes.terms)} />
                </>
            )
        }

        if (stepIndex === 1) {
            return (
                <>
                    <OtpValidation number={user.phone} resend={() => validateUserPhone()} submit={(code) => submitOTP(code)} />
                    <IconButton title="Back" action={() => setStepIndex(0)} />
                </>
            )
        }

        if (stepIndex === 2) {
            return (
                <>
                    <UserData username={user.username} email={user.email} password={user.password} change={(key, value) => onInputChange(key, value)} />
                    <MainButton title="Create Account" loading={loading} action={() => onRegisterPress()} />
                    <View style={styles.dead_container} />
                    <IconButton title="Back" action={() => setStepIndex(0)} />
                </>
            )
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardDismissMode={"on-drag"}>
            <Animated.View style={{ top: height }}>
                <View style={styles.logo_container}>
                    <RegisterLogo width={150} height={150} />
                </View>
                {renderContent()}
            </Animated.View>
        </ScrollView>
    )
}