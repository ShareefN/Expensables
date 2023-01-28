import React, { useState, useCallback, useEffect } from 'react';
import { View, RefreshControl, FlatList } from 'react-native';
import { Button, Text, Caption, FAB } from 'react-native-paper';
import { styles } from '../constants/styles';
import { secondary, primary } from '../constants/theme';
import { useSelector } from 'react-redux';
import { selectVehicles } from '../features/vehicles/vehiclesSlice';
import VehicleIcon from '../assets/vehicle.svg';
import IconButton from '../components/buttons/icon_button';
import BottomUpModal from '../components/modal/bottom_up_modal';
import CreateVehicle from '../components/forms/create_vehicle';
import { userVehicles } from '../controllers/vehicle';
import VehicleItem from '../components/containers/vehicle_item';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Vehicles({ navigation }) {

    const vehicles = useSelector(selectVehicles)
    const [content, setContent] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => { userVehicles() }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        userVehicles()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    onCreateVehiclePress = () => {
        setContent(<CreateVehicle close={() => setContent(null)} />)
    }

    renderPlaceholder = () => {
        return (
            <View style={styles.centerd_placeholder}>
                <View style={styles.logo_container}>
                    <VehicleIcon width={250} height={250} />
                </View>
                <IconButton icon="car-hatchback" title="Add you first Vehicle" action={() => onCreateVehiclePress()} margin={0} />
            </View>
        )
    }

    renderVehicleItem = ({ item }) => {
        return <VehicleItem vehicle={item} />
    }

    renderVehiclesList = () => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
                data={vehicles}
                renderItem={renderVehicleItem}
                keyExtractor={item => item._id}
            />
        )
    }

    return (
        <>
            <View style={[styles.container, styles.default_horizontal_padding]}>
                <Button icon="arrow-left" style={styles.back_button_container} onPress={() => navigation.goBack()} textColor={secondary} />
                <Text variant="displayMedium">Your Vehicles</Text>
                <Caption>You have {vehicles?.length ?? 0} registered vehicles</Caption>

                {!vehicles?.length ? renderPlaceholder() : renderVehiclesList()}
                <BottomUpModal content={content} close={() => setContent(null)} />
            </View>
            <FAB onPress={() => onCreateVehiclePress()} icon="plus" style={styles.top_right_fab} color={primary} mode="flat" />
        </>
    )
}
