import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../constants/styles';
import moment from 'moment';

export default function Expense({ item }) {
    const color = item.type == 'in' ? 'green' : 'red';

    return (
        <TouchableOpacity style={[styles.row_container, styles.dead_container]}>
            <View style={styles.col_container}>
                <Text style={styles.header_text}>{item.category.category}</Text>
                <Text style={styles.subheader_text}>{moment(item.createdAt).format('MMMM D, YYYY HH:MM A')}</Text>
            </View>
            <View style={[styles.col_container, styles.align_center]}>
                <Text style={[styles.subheader_text, { color }]}>- {item.amount}</Text>
                <Text style={styles.header_text}>{item.currency}</Text>
            </View>
        </TouchableOpacity>
    )
}

