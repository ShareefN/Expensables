import { configureStore } from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';
import vehicleSlice from './features/vehicles/vehiclesSlice';
import registrationSlice from './features/registrations/registrationSlice';
import historySlice from './features/history/historySlice';
import loaginSlice from './features/loading/loadingSlice';
import guideSlice from './features/guide/guideSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        vehicle: vehicleSlice,
        registrations: registrationSlice,
        history: historySlice,
        loading: loaginSlice,
        guide: guideSlice
    },
});