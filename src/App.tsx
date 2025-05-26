import '../gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from './theme/colors';
import BottomTabNavigation from './navigation/BottomTabNavigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <BottomTabNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
      <StatusBar translucent backgroundColor={Colors.primaryBlueLight} />
    </Provider>
  );
};

export default App;
