import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    expenses: [],
    total: 0
}

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        expenses: (state, action) => {
            state.expenses = action.payload
        },
        total: (state, action) => {
            state.total = action.payload
        },
        add: (state, action) => {
            state.total = state.total + action.payload;
        },
        sub: (state, action) => {
            state.total = state.total - action.payload;
        }
    }
});

export const { expenses, total, add, sub } = expensesSlice.actions;

export const selectExpenses = (state) => state.expenses;

export const selectTotal = (state) => state.total;

export default expensesSlice.reducer;