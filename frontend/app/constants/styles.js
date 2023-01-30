import { StyleSheet, Dimensions } from 'react-native';
import { secondary, primary, input_background } from './theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    default_horizontal_padding: {
        paddingHorizontal: 20
    },
    default_horizontal_padding_small: {
        paddingHorizontal: 10
    },
    logo_container: {
        alignItems: 'center',
    },
    align_start: {
        alignItems: 'flex-start'
    },
    align_center: {
        alignItems: 'center'
    },
    dead_container: {
        marginVertical: 20
    },
    dead_container_small: {
        marginVertical: 10,
    },
    title_text: {
        fontSize: 25
    },
    header_text: {
        fontSize: 20
    },
    subheader_text: {
        fontSize: 15,
        color: secondary
    },
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    col_container: {
        flexDirection: 'column',
    },
    light_boarder_bottom: {
        borderBottomWidth: 0.2
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: primary,
        borderRadius: 10
    },
    bottom_up_modal_fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 70,
        backgroundColor: secondary,
        borderRadius: 10
    },
    full_width_height: {
        width: '100%',
        height: '100%',
    },
    light_background: {
        backgroundColor: input_background
    },
    device_width: {
        width: Dimensions.get('window').width - 40
    }
})  