import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, Caption } from 'react-native-paper'
import { selectUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import { styles } from '../constants/styles';
import { secondary } from '../constants/theme';
import PrimaryInput from '../components/inputs/primary_input';
import IconButton from '../components/buttons/icon_button';
import { clearStorage } from '../utils/store_encryption';
import { updateUser, validatePhoneNumber, deleteUser, getUser } from '../controllers/user';
import { emailVaidation } from '../utils/regex';
import { errorToast, successToast } from '../components/toast/toast';
import OtpValidation from '../components/forms/otp_verification';
import { sendOneTimePassword, confirmOneTimePassword, logEvent } from '../controllers/firebase';
import ConfirmationDialog from '../components/dialog/confirmation_dialog';
import moment from 'moment';
import { shareApp } from '../utils/share_app';
import { unifyMobileNumber } from '../utils/helpers';

export default function Profile({ navigation }) {
    const { email, username, phone, loyalty_points, createdAt } = useSelector(selectUser)

    const [verificationId, setVerficationId] = useState(null);
    const [dialogContent, setDialogContent] = useState({
        visible: false,
        title: null,
        message: null,
        action: null,
        dismiss: null
    });

    useEffect(() => { getUser() }, [])

    const [user, setUser] = useState({
        email: email,
        username: username,
        phone: phone,
        loyalty_points: loyalty_points
    })

    onInputChange = (key, value) => {
        setUser({ ...user, [key]: value })
    }

    onUpdateUsername = (data) => {
        if (data.username === username) return
        if (data.username.length < 3) return errorToast('Invalid Entry', 'Minimum length for username is 3')
        updateUser(data, () => { logEvent('username_update', { username: user.username }), successToast('Username Updated', `Username successfully updated to ${user.username}`) })
    }

    onUpdateEmail = (data) => {
        if (data.email === email) return
        if (!emailVaidation(data.email)) return errorToast('Invalid Entry', 'The email you\'ve entered is invalid')
        updateUser(data, () => { logEvent('email_update', { email: user.email }), successToast('Email Updated', `Email successfully updated to ${user.email}`) })
    }

    onUpdatePhone = async (data) => {
        if (data.phone === phone) return;
        if (data.phone.length < 8) return errorToast('Invalid Entry', 'Please verify that you\'ve entred a right mobile number')

        onInputChange('phone', unifyMobileNumber(data.phone))

        let _result = await validatePhoneNumber(unifyMobileNumber(data.phone));

        if (_result === 202) {
            return errorToast('Already Taken', `${unifyMobileNumber(data.phone)} is associated with another account`)
        }

        let _confirm = await sendOneTimePassword(unifyMobileNumber(user.phone));

        if (_confirm.verificationId) {
            return setVerficationId(_confirm);
        }

        errorToast('Error Sending OTP', `We faced an issue sending the OTP, Try Again`)
    }

    onSubmitOTP = async (code) => {
        let _result = await confirmOneTimePassword(code, verificationId)

        if (_result === 200) {
            updateUser({ phone: unifyMobileNumber(user.phone) }, () => { logEvent('phone_update', { phone: unifyMobileNumber(user.phone) }), setVerficationId(null), successToast('Phone Updated', `Phone successfully updated to ${unifyMobileNumber(user.phone)}`) })
        }
        errorToast('Invalid Code', `The code you've sent is invalid, Try Again`)

    }

    onVerificationBack = () => {
        onInputChange('phone', unifyMobileNumber(phone))
        setVerficationId(null)
    }

    if (verificationId) {
        return (
            <View style={styles.container}>
                <OtpValidation number={user.phone} resend={() => onUpdatePhone({ phone: unifyMobileNumber(user.phone) })} submit={(code) => onSubmitOTP(code)} />
                <IconButton title="Back" action={() => onVerificationBack()} margin={20} />
            </View>
        )
    }

    onLogoutPress = () => {
        setDialogContent({
            visible: true,
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            action: () => {
                logEvent('logout_event', { username: user.username, email: user.email })
                clearStorage()
            },
            dismiss: onDismissDilaog
        })
    }

    onDeletePress = () => {
        setDialogContent({
            visible: true,
            title: 'Delete Account',
            message: 'Are you sure you want to delete your account? This action cannot be undone.',
            action: () => {
                logEvent('delete_account', { username: user.username, email: user.email })
                deleteUser()
            },
            dismiss: onDismissDilaog
        })
    }

    onDismissDilaog = () => {
        setDialogContent({
            visible: false,
            title: null,
            message: null,
            action: null,
            dismiss: null
        })
    }

    return (
        <ScrollView style={[styles.container, styles.default_horizontal_padding]}>
            <View style={styles.flex_between}>
                <View>
                    <Button icon="arrow-left" style={styles.back_button_container} onPress={() => navigation.goBack()} textColor={secondary} />
                    <Text variant="displayMedium">{username ?? ''}</Text>
                    <Caption>Joined {moment(createdAt).format('MMMM D YYYY')}</Caption>
                    <PrimaryInput title="Username" action={(i) => onInputChange('username', i)} value={user.username} maxlength={25} submitAction={() => onUpdateUsername({ username: user.username })} />
                    <PrimaryInput title="Email" action={(i) => onInputChange('email', i)} type="email-address" value={user.email} submitAction={() => onUpdateEmail({ email: user.email })} />
                    <PrimaryInput title="Phone" action={(i) => onInputChange('phone', i)} type="phone-pad" value={user.phone} submitAction={() => onUpdatePhone({ phone: user.phone })} />
                </View>
                <View>
                    <View style={styles.dead_container} />
                    <IconButton icon="logout-variant" title="Logout" action={() => onLogoutPress()} margin={0} />
                    <View style={styles.dead_container} />
                    <IconButton icon="export-variant" title="Share Perky Parker" action={() => shareApp()} margin={0} />
                    <View style={styles.dead_container} />
                    <IconButton icon="account-cancel-outline" title="Delete Account" action={() => onDeletePress()} margin={0} />
                </View>
            </View>
            <ConfirmationDialog content={dialogContent} />
        </ScrollView>
    )
}


