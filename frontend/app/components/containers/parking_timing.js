import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ParkingHour from '../buttons/parking_hour';
import { getZone } from '../../controllers/zone';
import { Text, Caption } from 'react-native-paper';
import FreeParking from './free_parking_sticker';
import { isTimeBetween } from '../../utils/helpers';

export default function ParkingTiming(props) {
    const { zone, total, select } = props

    const [zoneData, setZoneData] = useState([])
    const [isBetween, setIsBetween] = useState(true);

    const getZoneData = async () => {
        if (zone) {
            let result = await getZone(zone);
            setZoneData(result);
            setIsBetween(isTimeBetween(result.start_time, result.end_time));
        }
    }

    useMemo(() => { getZoneData() }, [zone])

    return (
        <>
            {!isBetween ? <FreeParking zone={zoneData} /> : null}
            <Text variant="titleMedium">Select Appropriate Timing</Text>
            <Caption>{`Parking in zone ${zoneData?.zone ?? ''} is paid between ${zoneData?.start_time ?? 0} AM - ${zoneData?.end_time ?? 0} PM`}</Caption>
            <View style={styles.small_dead_view} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    {zoneData && zoneData?.tariff?.map((elm, index) => {
                        return (
                            <ParkingHour key={index} elm={elm} active={total === elm} select={(e) => select(e)} />
                        )
                    })}
                </View>
            </ScrollView>
            <Caption>{`*Tariff prices differ depending on the zone`}</Caption>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    small_dead_view: {
        marginVertical: 5
    },
})