import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Caption, Button } from 'react-native-paper';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { primary, secondary } from '../../constants/theme';

const CELL_COUNT = 6;
let interval;

export default function OtpValidation({ number, resend, submit }) {
    const [value, setValue] = useState('');
    const [counter, setCounter] = useState(60);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [properties, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        interval = setTimeout(() => {
            if (counter > 0) setCounter(counter - 1);
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [counter])

    useEffect(() => {
        if (value.length === CELL_COUNT) { submit(value) }
    }, [value])

    onResendOTP = () => {
        resend();
        setCounter(60)
    }

    return (
        <View style={styles.root}>
            <Text variant="displaySmall">Enter OTP</Text>
            <Caption>A 4 digit code has been sent to{'\n'}<Text>{number}</Text></Caption>
            <CodeField
                ref={ref}
                {...properties}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <Button mode="text" disabled={counter > 0} onPress={() => onResendOTP()} style={styles.resend_container} textColor={primary}>
                {counter > 0 ? `Resend in ${counter}s` : 'Resend SMS OTP'}
            </Button>
        </View>
    );
}


const styles = StyleSheet.create({
    root: { paddingHorizontal: 20 },
    codeFieldRoot: { marginTop: 15 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        borderRadius: 2,
        fontSize: 24,
        borderWidth: 0.5,
        borderColor: secondary,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    focusCell: {
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resend_container: {
        alignItems: 'flex-end',
        color: primary,
        paddingTop: 5,
        paddingBottom: 20
    }
});