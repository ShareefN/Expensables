import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { setDispatch } from '../utils/global_dispatch';
import { retreiveUserToken } from '../utils/store_encryption';

import { selectIsLoggedIn } from '../features/userSlice';

import Splash from '../screens/splash';

import PublicRoutes from './public_routes';
import PrivateRoutes from './private_routes';
import { init } from '../controllers/init';

function AppNavigation() {
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const dispatch = useDispatch();

    // Initate a global dispach method, access from non-react files
    setDispatch(dispatch);

    useEffect(() => {
        (async () => {
            let _token = await retreiveUserToken();

            if (_token) init(_token)

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