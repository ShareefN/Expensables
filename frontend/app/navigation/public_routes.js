import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../constants/routes';

import Login from '../screens/auth/login';
import ForgotPassword from '../screens/auth/forgot_password';
import Register from '../screens/auth/register';
import Terms from '../screens/terms';

const Stack = createNativeStackNavigator();

const commonOptions = { headerShown: false }

function PublicRoutes() {
    return (
        <Stack.Navigator initialRouteName={routes.register}>
            <Stack.Screen name={routes.login} component={Login} options={commonOptions} />
            <Stack.Screen name={routes.forgot} component={ForgotPassword} options={commonOptions} />
            <Stack.Screen name={routes.register} component={Register} options={commonOptions} />
            <Stack.Screen name={routes.terms} component={Terms} options={commonOptions} />
        </Stack.Navigator>

    )
}

export default PublicRoutes;