import React from 'react';
import { View } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import { styles } from './styles';
import PrimaryInput from '../../inputs/primary_input';

export default function EmailAuthentication(props) {

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Login</Text>
            <Caption>Login using Email & Password</Caption>
            <PrimaryInput title="Email" action={(i) => props.change('email', i)} type="email-address" value={props.email} />
            <PrimaryInput title="Password" action={(i) => props.change('password', i)} isSecure={true} value={props.password} />
        </View>
    )
}