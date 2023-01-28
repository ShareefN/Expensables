import { createSlice } from '@reduxjs/toolkit';
import { setFirstLaunch } from '../../utils/persisted_storage';

const initialState = {
    vehicles: false,
    manual: false,
    capture: false
}

export const guideSlice = createSlice({
    name: 'guide',
    initialState,
    reducers: {
        start: (state) => {
            state.vehicles = true;
            state.manual = false;
            state.capture = false;
        },
        next: (state, action) => {
            state.vehicles = action.payload?.vehicles ?? false;
            state.manual = action.payload?.manual ?? false;
            state.capture = action.payload?.capture ?? false;
        },
        end: (state) => {
            setFirstLaunch();
            state.manual = false;
            state.vehicles = false;
            state.capture = false;
        }
    }
})

export const { start, next, end } = guideSlice.actions;

export const vehicleTooltip = (state) => state.guide.vehicles;
export const manualTooltip = (state) => state.guide.manual;
export const captureTooltip = (state) => state.guide.capture;

export default guideSlice.reducer;