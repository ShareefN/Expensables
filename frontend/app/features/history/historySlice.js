import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: []
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.history = action.payload;
        },
        clearHistory: (state) => {
            state.history = [];
        }
    }
})

export const { setHistory, clearHistory } = historySlice.actions;

export const selectHistory = (state) => state.history.history;

export default historySlice.reducer;