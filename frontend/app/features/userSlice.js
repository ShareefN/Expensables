import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    username: null,
    number: null,
    dailyLimit: null,
    createdAt: null,
    lastLogin: null,
    currency: null,
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email,
                state.username = action.payload.username,
                state.number = action.payload.number,
                state.dailyLimit = action.payload.dailyLimit,
                state.lastLogin = action.payload.lastLogin,
                state.currency = action.payload.currency,
                state.createdAt = action.payload.createdAt,
                state.isLoggedIn = true
        },
        clearUser: (state) => {
            state.email = null,
                state.username = null,
                state.number = null,
                state.dailyLimit = null,
                state.createdAt = null,
                state.lastLogin = null
            state.currency = null,
                state.isLoggedIn = false
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUser = (state) => state.user;

export default userSlice.reducer;