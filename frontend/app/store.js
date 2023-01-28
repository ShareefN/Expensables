import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/userSlice';
import loaginSlice from './features/loadingSlice'
import categorySlice from './features/categorySlice';

export default configureStore({
    reducer: {
        user: userSlice,
        loading: loaginSlice,
        category: categorySlice,
    },
});