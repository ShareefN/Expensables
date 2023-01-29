import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/userSlice';
import loaginSlice from './features/loadingSlice'
import categorySlice from './features/categorySlice';
import collectionSlice from './features/collectionSlice';
import expensesSlice from './features/expensesSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        loading: loaginSlice,
        category: categorySlice,
        collections: collectionSlice,
        expenses: expensesSlice
    },
});