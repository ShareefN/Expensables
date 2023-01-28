import React from "react";
import { View, StyleSheet } from "react-native";
import { secondary, primary } from '../../constants/theme';
import Modal from "react-native-modal";
import { FAB } from 'react-native-paper';

export default function BottomUpModal(props) {
    const { content, close, height } = props;

    return (
        <Modal
            animationType="slide"
            visible={content !== null}
            avoidKeyboard={true}
            style={styles.modal_container}
            onBackdropPress={() => close()}
        >

            <View style={[styles.content, { height: height ?? styles.content.height }]}>
                <View style={styles.dead_bar} />
                <FAB
                    icon="close"
                    style={styles.fab}
                    size="small"
                    onPress={() => close()}
                    mode="flat"
                    color={primary}
                />
                {content}
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    modal_container: {
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    content: {
        height: '80%',
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center'
    },
    dead_bar: {
        height: 5,
        backgroundColor: secondary,
        width: '30%',
        borderRadius: 50,
        marginVertical: 10
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
        backgroundColor: "transparent",
    },
})