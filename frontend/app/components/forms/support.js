import React, { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import PrimaryInput from '../inputs/primary_input';
import MainButton from '../buttons/main_button';
import { submitSupprot } from '../../controllers/user';
import { logEvent } from '../../controllers/firebase';

export default function Support(props) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    const onSubmitPress = () => {
        setLoading(true);
        submitSupprot({ message }, () => {
            logEvent("support_message_sent", {})
            setLoading(false)
            props.close();
        })
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">How can we help?</Text>
            <View style={styles.full_width}>
                <PrimaryInput title="Message" action={(i) => setMessage(i)} value={message} maxlength={120} multiline={true} submitAction={() => Keyboard.dismiss()} numberoflines={3} />
                <View style={styles.caption_align}>
                    <Caption>{message.length} / 120</Caption>
                </View>
                <View style={styles.dead_view} />
                <MainButton title="Submit" loading={loading} action={() => onSubmitPress()} margin={0} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        marginTop: 20,
        paddingHorizontal: 20
    },
    dead_view: {
        marginVertical: 10
    },
    full_width: {
        width: '100%',
    },
    caption_align: {
        alignItems: 'flex-end'
    }
})