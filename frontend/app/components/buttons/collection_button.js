import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCollections } from '../../features/collectionSlice';
import { Button } from 'react-native-paper';
import { styles } from '../../constants/styles';
import TotalSpending from '../containers/total_spending';

export default function CollectionButton({ onpress }) {
    const { active } = useSelector(selectCollections);

    return (
        <View>
            <TouchableOpacity style={internalStyles.container} onPress={() => onpress()}>
                <Text style={styles.title_text}>{active?.title ?? 'Create Collection'}</Text>
                <Button icon='chevron-down' textColor='black' />
            </TouchableOpacity>
            <TotalSpending />
        </View>
    )

}

const internalStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('window').width / 3.5,

    }
})