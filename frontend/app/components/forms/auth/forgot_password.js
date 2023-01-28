import React from 'react';
import { View } from 'react-native';
import { Text, Caption, Button } from 'react-native-paper';
import { styles } from './styles';
import PrimaryInput from '../../inputs/primary_input';

export default function ForgotPasswordForm(props) {

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">ForgotPassword?</Text>
            <Caption>Don't worry! it happens. Please enter the address associated with your account.</Caption>
            <PrimaryInput title="Email" action={(i) => props.change(i)} type="email-address" value={props.email} />
        </View>
    )
}