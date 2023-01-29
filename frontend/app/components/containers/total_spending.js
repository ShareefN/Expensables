import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../constants/styles';
import { useSelector } from 'react-redux';
import { selectExpenses } from '../../features/expensesSlice';
import { selectUser } from '../../features/userSlice';

export default function TotalSpending() {
    const { total } = useSelector(selectExpenses);
    const { currency, dailyLimit } = useSelector(selectUser);

    return (
        <View style={styles.col_container}>
            <Text style={styles.header_text}>{`${total} ${currency}`}</Text>
            <Text style={styles.subheader_text}>Daily Limit: {dailyLimit} {currency ?? ''}</Text>
        </View>
    )
}