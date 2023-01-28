import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    registrations: []
}

export const registrationSlice = createSlice({
    name: 'registrations',
    initialState,
    reducers: {
        setRegistration: (state, action) => {
            state.registrations = action.payload;
        },
    }
});

export const { setRegistration } = registrationSlice.actions;

export const selectRegistration = (state) => state.registrations.registrations;

export default registrationSlice.reducer;