import React, {useEffect, userContext} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { AppState, Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {SocketContext, SocketProvider} from './src/subcomponents/Socket';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Views
import Login from './src/stacks/Login';
import { getStorage } from './src/api/asyncStorage';

// eslint-disable-next-line prettier/prettier
export default function App({ }){

  useEffect(() => {
    getStorage('user')
    .then((response) => {
      console.log(response, '***')
      
    })
    .catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <Provider store={store}>
      <SocketProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Sign in', headerStyle:{
                backgroundColor: '#000'
              }}}
            >
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SocketProvider>
    </Provider>
  );
}
