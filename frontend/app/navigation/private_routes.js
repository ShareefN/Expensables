import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../constants/routes';

import Home from '../screens/home';
const Stack = createNativeStackNavigator();

const commonOptions = { headerShown: false }

function PrivateRoutes() {
    return (
        <Stack.Navigator initialRouteName={routes.home}>
            <Stack.Screen name={routes.home} component={Home} options={commonOptions} />
        </Stack.Navigator>

    )
}

export default PrivateRoutes;