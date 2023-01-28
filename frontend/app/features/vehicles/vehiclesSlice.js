import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    vehicles: []
}

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setVehicles: (state, action) => {
            state.vehicles = action.payload;
        },
        clearVehicles: (state) => {
            state.vehicles = []
        }
    }
})

export const { setVehicles, clearVehicles } = vehicleSlice.actions;

export const selectVehicles = (state) => state.vehicle.vehicles;

export default vehicleSlice.reducer;