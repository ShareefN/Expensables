import { StyleSheet } from 'react-native';
import { secondary, primary } from './theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    default_horizontal_padding: {
        paddingHorizontal: 20
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
})  