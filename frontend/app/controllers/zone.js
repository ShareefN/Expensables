import { getZonesApi, getZoneApi, getZoneByCharApi } from '../api/private';
import { dispatchAction } from '../utils/global_dispatch';
import { setLoading } from '../features/loading/loadingSlice';

export const getZones = async () => {
    let result = [];
    try {
        result = await getZonesApi();
        return result.data;
    } catch (error) {
        return result;
    }
}

export const getZone = async (zone) => {
    dispatchAction(setLoading({ loading: true }))
    let result = null;

    try {
        result = await getZoneApi(zone);
        dispatchAction(setLoading({ loading: false }))
        return result.data;
    } catch (error) {
        dispatchAction(setLoading({ loading: false }))
        return result;
    }
}

export const getZoneByChar = async (char) => {
    dispatchAction(setLoading({ loading: true }))

    let result = null;

    try {
        result = await getZoneByCharApi(char);
        dispatchAction(setLoading({ loading: false }))
        return result.data._id
    } catch (error) {
        dispatchAction(setLoading({ loading: false }))
        return result;
    }

}