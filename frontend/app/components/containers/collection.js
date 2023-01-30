import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../constants/styles';
import { Button } from 'react-native-paper';

export default function Collection({ item, onItemSelect }) {
    return (
        <TouchableOpacity style={[styles.dead_container_small, styles.row_container, styles.device_width]} onPress={() => onItemSelect()}>
            <Text style={styles.title_text}>{item.title}</Text>
            <View style={styles.row_container}>
                <TouchableOpacity onPress={() => console.log('edit')}>
                    <Button icon='plus' textColor='black' />
                </TouchableOpacity>
                <View style={styles.default_horizontal_padding_small} />
                <TouchableOpacity onPress={() => console.log('delete')}>
                    <Button icon='plus' textColor='black' />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}