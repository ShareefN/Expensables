import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from '../constants/styles';
import BottomUpModal from '../components/modal/bottom_up_modal';
import CollectionButton from '../components/buttons/collection_button';
import AvatarButton from '../components/buttons/avatar_button';
import Expenses from '../components/containers/expenses';
import { FAB } from 'react-native-paper';
import { getCollections } from '../controllers/collections';
import Colelctions from '../components/containers/collections';
import CreateCollection from '../components/containers/create_collection';
import { useSelector } from 'react-redux';
import { selectCollections } from '../features/collectionSlice';
import CreateExpense from '../components/containers/create_expense';

export default function Home() {
    const { collections } = useSelector(selectCollections);

    const [content, setContent] = useState(null)

    const onCollectionPress = async () => {
        if (collections.length === 0) return onCreateCollectionPress();
        await getCollections();
        setContent(<Colelctions close={() => setContent(null)} onCreate={() => onCreateCollectionPress()} />)
    }

    const onCreateCollectionPress = async () => {
        setContent(<CreateCollection close={() => setContent(null)} />)
    }

    const onCreateExpensePress = async () => {
        setContent(<CreateExpense />)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.row_container, styles.light_boarder_bottom]}>
                <CollectionButton onpress={() => onCollectionPress()} />
                <AvatarButton action={() => null} icon="account-outline" />
            </View>

            <Expenses />
            <BottomUpModal content={content} close={() => setContent(null)} />
            <FAB
                icon="plus"
                style={styles.fab}
                color="white"
                onPress={() => onCreateExpensePress()}
            />
        </View>
    );
}


