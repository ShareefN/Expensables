import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    username: null,
    phone: null,
    loyalty_points: null,
    createdAt: null,
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email,
                state.username = action.payload.username,
                state.phone = action.payload.phone,
                state.loyalty_points = action.payload.loyalty_points,
                state.createdAt = action.payload.createdAt,
                state.isLoggedIn = true
        },
        clearUser: (state) => {
            state.email = null,
                state.username = null,
                state.phone = null,
                state.loyalty_points = null,
                state.createdAt = null,
                state.isLoggedIn = false
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUser = (state) => state.user;

export default userSlice.reducer;