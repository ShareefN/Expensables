import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { setDispatch } from '../utils/global_dispatch';
import { retreiveUserToken } from '../utils/store_encryption';
import { readFirstLaunch } from '../utils/persisted_storage';
import { getUser } from '../controllers/user';
import { initInstance } from '../api/private';
import { selectIsLoggedIn } from '../features/user/userSlice';
import { start } from '../features/guide/guideSlice';

import Splash from '../screens/splash';

import PublicRoutes from './public_routes';
import PrivateRoutes from './private_routes';

function AppNavigation() {
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const dispatch = useDispatch();

    // Initate a global dispach method, access from non-react files
    setDispatch(dispatch);

    useEffect(() => {
        (async () => {
            let _token = await retreiveUserToken();

            let _firstLaunch = await readFirstLaunch();

            if (!_firstLaunch) dispatch(start())

            if (_token) {
                await initInstance(JSON.parse(_token));
                return await getUser(() => setLoading(false));
            }

            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })()
    }, [])


    if (loading) return <Splash />

    return (
        <NavigationContainer>
            {isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
        </NavigationContainer>
    )
}

export default AppNavigation;