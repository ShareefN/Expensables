import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../../constants/styles';
import { useSelector } from 'react-redux';
import { selectCollections } from '../../features/collectionSlice';
import IconButton from '../buttons/icon_button';

export default function Colelctions() {
    const { collections } = useSelector(selectCollections);

    if (collections.length === 0) {
        return (
            <View style={styles.logo_container}>
                <IconButton title="Create A Collection" action={() => console.log('.')} icon="plus" />
            </View>
        )
    }

    return <FlatList
        data={collections}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={item => item._id}
    />
}

