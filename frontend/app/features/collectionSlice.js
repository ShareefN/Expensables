import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collections: [],
    active: null
}

export const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        collections: (state, action) => {
            state.collections = action.payload
        },
        setActive: (state, action) => {
            state.active = action.payload
        }
    }
});

export const { collections, setActive } = collectionSlice.actions;

export const selectCollections = (state) => state.collections;

export const selectActive = (state) => state.active;

export default collectionSlice.reducer;