import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../constants/routes';

import Login from '../screens/auth/login';
import Terms from '../screens/terms';

const Stack = createNativeStackNavigator();

const commonOptions = { headerShown: false }

function PublicRoutes() {
    return (
        <Stack.Navigator initialRouteName={routes.login}>
            <Stack.Screen name={routes.login} component={Login} options={commonOptions} />
            <Stack.Screen name={routes.terms} component={Terms} options={commonOptions} />
        </Stack.Navigator>

    )
}

export default PublicRoutes;