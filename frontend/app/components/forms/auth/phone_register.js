import React from 'react';
import { View } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import { styles } from './styles';
import PrimaryInput from '../../inputs/primary_input';

export default function PhoneRegister(props) {

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Create Account</Text>
            <Caption>Enter Mobile Phone, Ex: +971......</Caption>
            <PrimaryInput title="Mobile Number" action={(i) => props.change('phone', i)} type="phone-pad" value={props.phone} />
        </View>
    )
}