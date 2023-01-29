import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { selectExpenses } from '../../features/expensesSlice';
import { useSelector } from 'react-redux';
import Expense from './expense';
import HistoryLogo from '../../assets/history.svg';
import { styles } from '../../constants/styles';
import IconButton from '../buttons/icon_button';
import { getExpenses } from '../../controllers/expenses';

export default function Expenses() {
    const { expenses } = useSelector(selectExpenses);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getExpenses('out')
        setRefreshing(false);
    }, []);

    if (expenses.length === 0) {
        return (
            <View style={[styles.logo_container, styles.col_container]}>
                <HistoryLogo width={400} />
                <IconButton title="Retry" action={() => getExpenses('out')} icon="restart" />
            </View>
        )
    }

    return <FlatList
        data={expenses}
        renderItem={({ item }) => <Expense item={item} />}
        keyExtractor={item => item._id}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
    />
}