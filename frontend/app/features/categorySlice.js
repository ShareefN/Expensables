import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: []
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        categories: (state, action) => {
            state.categories = action.payload
        }
    }
});

export const { categories } = categorySlice.actions;

export const selectCategories = (state) => state.categories;

export default categorySlice.reducer