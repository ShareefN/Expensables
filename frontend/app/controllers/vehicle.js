import { getVehiclesApi, createVehicleApi, editVehicleApi, deleteVehicleApi } from '../api/private';
import { setVehicles } from '../features/vehicles/vehiclesSlice';
import { dispatchAction } from '../utils/global_dispatch';
import { errorToast, successToast } from '../components/toast/toast';
import { setLoading } from '../features/loading/loadingSlice';

export const userVehicles = (next) => {
    getVehiclesApi().then(({ data }) => {
        dispatchAction(setVehicles(data))
        if (next) next();
    }).catch(error => errorToast('User Vehicles', 'Troubles getting user vehicles'))
}

export const createVehicle = (data, next) => {
    data.plate_code = data?.plate_code?.toUpperCase() ?? null;
    createVehicleApi(data).then(({ data }) => {
        successToast('Vehicle Regiseted', 'You\'ve successfully added a vehicle');
        userVehicles(next)
    }).catch((error => {
        errorToast('Creation Error', 'Vehicle already registered');
        if (next) next();
    }))
}

export const editVehicle = (id, data, next) => {
    data.plate_code = data?.plate_code?.toUpperCase() ?? null;
    editVehicleApi(id, data).then(({ data }) => {
        successToast('Vehicle Updated', 'You\'ve successfully updated your vehicle');
        userVehicles(next)
    }).catch((error) => {
        console.log(error)
        errorToast('Edit Error', 'Vehicle already registered');
        if (next) next();
    })
}

export const deleteVehicle = (id, next) => {
    dispatchAction(setLoading({ loading: true }))
    deleteVehicleApi(id).then(({ data }) => {
        dispatchAction(setLoading({ loading: false }))
        successToast('Vehicle Delete', 'You\'ve successfully deleted your vehicle');
        userVehicles(next)
    }).catch((error) => {
        dispatchAction(setLoading({ loading: false }))
        if (next) next();
        errorToast('Delete Error', 'There was a problem deleting your vehicle, Try again');
    })
}