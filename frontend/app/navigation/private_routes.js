import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../constants/routes';

import Home from '../screens/home';
import Profile from '../screens/profile';
import Vehicles from '../screens/vehicles';
import History from '../screens/history';

const Stack = createNativeStackNavigator();

const commonOptions = { headerShown: false }

function PrivateRoutes() {
    return (
        <Stack.Navigator initialRouteName={routes.home}>
            <Stack.Screen name={routes.home} component={Home} options={commonOptions} />
            <Stack.Screen name={routes.profile} component={Profile} options={commonOptions} />
            <Stack.Screen name={routes.vehicles} component={Vehicles} options={commonOptions} />
            <Stack.Screen name={routes.history} component={History} options={commonOptions} />
        </Stack.Navigator>

    )
}

export default PrivateRoutes;