import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from '../../constants/styles';
import MainButton from '../../components/buttons/main_button';
import ForgotIcon from '../../assets/auth/forgot.svg';
import { secondary } from '../../constants/theme';
import { emailVaidation } from '../../utils/regex';
import { errorToast, successToast } from '../../components/toast/toast';

import ForgotPasswordForm from '../../components/forms/auth/forgot_password';

function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);

    onResetPress = () => {
        if (!emailVaidation(email)) {
            return errorToast('Invalid Entry', 'The email you\'ve entered is invalid')
        }

        successToast('Recovery Link Sent', `Recovery link sent to ${email}`)
    }


    return (
        <View style={styles.container}>
            <Button icon="arrow-left" style={styles.back_button_container} onPress={() => navigation.goBack()} textColor={secondary} />
            <View style={styles.logo_container}>
                <ForgotIcon width={150} height={150} />
            </View>
            <ForgotPasswordForm email={email} change={(i) => setEmail(i)} />
            <MainButton title="Send Recovery Link" loading={loading} action={() => onResetPress()} />
        </View>
    );
}



export default ForgotPassword;