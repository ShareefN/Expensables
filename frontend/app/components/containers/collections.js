import React from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../../constants/styles';
import { useSelector } from 'react-redux';
import { selectCollections, setActive } from '../../features/collectionSlice';
import Collection from './collection';
import { storeCollectionId, readCollectionId } from '../../utils/persisted_storage';
import { getExpenses } from '../../controllers/expenses';
import { dispatchAction } from '../../utils/global_dispatch';
import { setLoading } from '../../features/loadingSlice';
import { FAB } from 'react-native-paper';

export default function Colelctions({ close, onCreate }) {
    const { collections } = useSelector(selectCollections);

    onCollectionItemPress = async (item) => {
        let _id = await readCollectionId();

        if (_id === item._id) return close();

        dispatchAction(setLoading(true))

        await storeCollectionId(item._id);
        await dispatchAction(setActive(item))
        await getExpenses('out')

        setLoading(false)

        close();
    }

    return (
        <View style={[styles.align_start, styles.full_width_height, styles.dead_container, styles.default_horizontal_padding]}>
            <FlatList
                data={collections}
                renderItem={({ item }) => <Collection item={item} onItemSelect={() => onCollectionItemPress(item)} />}
                keyExtractor={item => item._id}
            />
            <FAB
                icon="plus"
                style={styles.bottom_up_modal_fab}
                color="white"
                size="small"
                onPress={() => onCreate()}
            />
        </View>
    )
}

