import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, Dialog, Portal, Button } from 'react-native-paper';
import { primary, secondary } from '../../constants/theme';

export default function ConfirmationDialog(props) {
    const { visible = false, title, message, action, dismiss } = props.content;

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={() => dismiss()} style={styles.container}>
                <Dialog.Title style={styles.text}>{title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph style={styles.text}>{message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => dismiss()} textColor={secondary}>Dismiss</Button>
                    <Button onPress={() => action()} textColor={primary}>Confirm</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    text: {
        textAlign: 'center',
    },
})

