import React from 'react';
import { View } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import { styles } from './styles';
import PrimaryInput from '../../inputs/primary_input';

export default function UserData(props) {

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Create Account</Text>
            <Caption>Final step, Let us know you!</Caption>
            <PrimaryInput title="Username (optional)" action={(i) => props.change('username', i)} type="name-phone-pad" value={props.username} maxlength={25} />
            <PrimaryInput title="Email" action={(i) => props.change('email', i)} type="email-address" value={props.email} />
            <PrimaryInput title="Password" action={(i) => props.change('password', i)} isSecure={true} value={props.password} />
            <Caption>Must be &gt; 8 characters</Caption>
        </View>
    )
}