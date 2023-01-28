import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { setDispatch } from '../utils/global_dispatch';
import { retreiveUserToken } from '../utils/store_encryption';

import { user } from '../controllers/user';
import { getCategories } from '../controllers/categories';

import { initInstance } from '../api/private';
import { selectIsLoggedIn } from '../features/userSlice';

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

            if (_token) {
                // Todo: Update this block to a promise.all waterfall, create it in a seperate controller
                await initInstance(JSON.parse(_token));
                await user();
                await getCategories()
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