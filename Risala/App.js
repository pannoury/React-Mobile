import React, {useEffect, userContext} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { AppState, Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {SocketContext, SocketProvider} from './src/subcomponents/Socket';
import { getStorage } from './src/lib/asyncStorage';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Views
import Login from './src/stacks/Login';
import Chat from './src/stacks/Chat';
import { postRequest } from './src/api/api';

// eslint-disable-next-line prettier/prettier
export default function App({ }){

  useEffect(() => {
    getStorage('user')
    .then((response) => {
      if(response){
        checkUser(JSON.parse(response).response)
      }
      
    })
    .catch((err) => {
      console.error(err)
    })

    function checkUser(value){
      postRequest('accounts', {
        account: value.account_id, 
        username: value.username
      })
      .then((response) => {
        navigation.navigate('Chat', { name: 'Chat' })
      })
    }
  }, [])

  return (
    <Provider store={store}>
      <SocketProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerStyle:{
                backgroundColor: '#000'
              }}}
            />
            <Stack.Screen 
              name="Chat"
              component={Chat}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SocketProvider>
    </Provider>
  );
}
