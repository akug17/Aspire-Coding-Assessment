import { createStackNavigator } from '@react-navigation/stack';
import { AddSpendingLimit } from '../screens/DebitCardStackScreens/AddSpendingLimit';
import DebitCardScreen from '../screens/BottomNavScreens/DebitCardScreen';
import { NAVIGATION_ROUTE_NAMES } from './navigationRouteNames';
import { Colors } from '../theme/colors';
import { Image } from 'react-native';

const Stack = createStackNavigator();

const HeaderRight = () => <Image source={require('../assets/Logo.png')} />;
const SpendingLimitHeaderOptions = {
  headerRight: HeaderRight,
  headerStyle: {
    backgroundColor: Colors.primaryBlueLight,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: 'white',
  headerTitle: '',
  headerBackTitle: '',
  headerRightContainerStyle: { marginEnd: 20 },
  headerLeftContainerStyle: { marginStart: 20 },
};

export const DebitCardStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION_ROUTE_NAMES.DEBIT_CARD_STACK.DEBIT_CARD_LANDING_SCREEN}
        component={DebitCardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTE_NAMES.DEBIT_CARD_STACK.ADD_SPENDING_LIMIT}
        component={AddSpendingLimit}
        options={SpendingLimitHeaderOptions}
      />
    </Stack.Navigator>
  );
};
