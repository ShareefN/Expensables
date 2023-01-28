import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    default_horizontal_padding: {
        paddingHorizontal: 20
    },
    flex_between: {
        justifyContent: 'space-between'
    },
    logo_container: {
        alignItems: 'center',
    },
    back_button_container: {
        alignItems: 'flex-start'
    },
    dead_container: {
        marginVertical: 10
    },
    flex_between: {
        height: Dimensions.get('window').height - 100,
        justifyContent: 'space-between'
    },
    centerd_placeholder: {
        height: Dimensions.get('window').height / 2,
        justifyContent: 'center'
    },
    top_right_fab: {
        zIndex: 999,
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
        backgroundColor: "transparent"
    },
    bottom_right_group: {
        position: 'absolute',
        margin: 10,
        right: 0,
        top: 0,
        backgroundColor: "transparent"
    },
    camera_error_placeholder: { position: 'absolute', left: '20%', right: '50%', top: '30%' }
})  