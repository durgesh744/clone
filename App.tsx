//@ts-nocheck
import React from 'react';
import 'react-native-gesture-handler'
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import {SocketProvider} from './src/context/socket';
import {AuthProvider} from './src/context/AuthContext';
import StackNavigator from './src/navigations/StackNavigator';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <AuthProvider>
          <NavigationContainer>
            <SocketProvider>
              <StackNavigator />
            </SocketProvider>
          </NavigationContainer>
        </AuthProvider>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
