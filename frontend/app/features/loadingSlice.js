import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload.loading
        }
    }
})

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state) => state.loading.loading;

export default loadingSlice.reducer;