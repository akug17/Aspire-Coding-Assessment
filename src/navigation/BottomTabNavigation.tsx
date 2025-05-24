import React from 'react';

import { HomeScreen } from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DebitCardScreen from '../screens/DebitCardScreen';
import { NAVIGATION_ROUTE_NAMES } from '../navigation/navigationRouteNames';
import { PaymentsScreen } from '../screens/PaymentsScreen';
import { CreditScreen } from '../screens/CreditScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { getIcon } from '../utils/cardUtils';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_ROUTE_NAMES.DEBIT_CARD}
      screenOptions={{ tabBarActiveTintColor: '#01D167' }}
    >
      <Tab.Screen
        name={NAVIGATION_ROUTE_NAMES.HOME}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: () => getIcon(NAVIGATION_ROUTE_NAMES.HOME),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE_NAMES.DEBIT_CARD}
        options={{
          title: 'Debit card',
          headerShown: false,
          tabBarIcon: () => getIcon(NAVIGATION_ROUTE_NAMES.DEBIT_CARD),
        }}
        component={DebitCardScreen}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE_NAMES.PAYMENTS}
        options={{
          title: 'Payments',
          headerShown: false,
          tabBarIcon: () => getIcon(NAVIGATION_ROUTE_NAMES.PAYMENTS),
        }}
        component={PaymentsScreen}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE_NAMES.CREDIT}
        options={{
          title: 'Credit',
          headerShown: false,
          tabBarIcon: () => getIcon(NAVIGATION_ROUTE_NAMES.CREDIT),
        }}
        component={CreditScreen}
      />
      <Tab.Screen
        name={NAVIGATION_ROUTE_NAMES.PROFILE}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: () => getIcon(NAVIGATION_ROUTE_NAMES.PROFILE),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
