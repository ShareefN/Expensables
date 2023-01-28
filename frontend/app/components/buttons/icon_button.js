import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { secondary } from '../../constants/theme';

export default function IconButton(props) {
    const { title, action, icon, margin } = props;

    return (
        <Button icon={icon} mode="outlined" onPress={() => action()} style={[styles.container, { marginHorizontal: margin ?? styles.container.marginHorizontal }]} textColor='black'>
            {title}
        </Button>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginHorizontal: 20,
        borderColor: secondary,
    }
})