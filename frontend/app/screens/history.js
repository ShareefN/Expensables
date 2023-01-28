import React, { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, FlatList } from 'react-native';
import { styles } from '../constants/styles';
import { getHistory, toggleVisibility } from '../controllers/history';
import { Button, Text, Caption } from 'react-native-paper';
import { secondary } from '../constants/theme';
import HistoryIcon from '../assets/history';
import IconButton from '../components/buttons/icon_button';
import BottomUpModal from '../components/modal/bottom_up_modal';
import { useSelector } from 'react-redux';
import { selectHistory } from '../features/history/historySlice';
import CreateParking from '../components/forms/create_parking';
import ParkingItem from '../components/containers/parking_item';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function History({ navigation }) {
    const history = useSelector(selectHistory)
    const [content, setContent] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => { getHistory() }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHistory()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    onCreateParkingPress = () => {
        setContent(<CreateParking close={() => { setContent(null), getHistory() }} />);
    }

    renderPlaceholder = () => {
        return (
            <View style={styles.centerd_placeholder}>
                <View style={styles.logo_container}>
                    <HistoryIcon width={250} height={250} />
                </View>
                <IconButton icon="parking" title="Create Parking" action={() => onCreateParkingPress()} margin={0} />
            </View>
        )
    }

    renderParkingItem = ({ item }) => {
        return <ParkingItem vehicle={item?.vehicle ?? {}} parking={item} toggle={(id, hide) => toggleVisibility(id, hide)} />
    }

    renderParkingList = () => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
                data={history}
                renderItem={renderParkingItem}
                keyExtractor={item => item._id}
            />
        )
    }

    return (
        <View style={[styles.container, styles.default_horizontal_padding]}>
            <Button icon="arrow-left" style={styles.back_button_container} onPress={() => navigation.goBack()} textColor={secondary} />
            <Text variant="displayMedium">Parking</Text>
            <Caption>You have {history?.length ?? 0} parking</Caption>
            {!history?.length ? renderPlaceholder() : renderParkingList()}
            <BottomUpModal content={content} close={() => setContent(null)} />
        </View>
    )
}

