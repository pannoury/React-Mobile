import React, {useEffect, useState, userContext} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Image } from 'react-native';
import { AppState, Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import { SocketContext, SocketProvider } from './src/subcomponents/Socket';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getStorage } from './src/lib/asyncStorage';
import { postRequest } from './src/api/api';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Views
import Login    from './src/stacks/Login';
import Chat     from './src/stacks/Chat';
import { chatReducer } from './src/redux/chat';

// eslint-disable-next-line prettier/prettier
export default function App({ }){
  const [page, setPage] = useState('Home');

  useEffect(() => {
    setTimeout(() => {
      getStorage('user')
      .then((response) => {
        if(response){
          setPage('Chat')
        } else {
          setPage('Login')
        }
      })
      .catch((err) => {
        console.error(err)
      })
    }, 400);
  }, [])

  useEffect(() => {
    console.log(page)
  }, [page])

  return (
    <Provider store={store}>
      <SocketProvider>
        <SafeAreaProvider>
        <StatusBar
          backgroundColor={'#000'}
          barStyle={'light-content'}
        />
        {
          page === "Chat" &&
          <Chat 
            page={page}
            setPage={setPage}
          />
        }
        {
          page === "Login" &&
          <Login 
            page={page}
            setPage={setPage}
          />
        }
        {
          page === "Home" &&
          <Home/>
        }
        </SafeAreaProvider>
      </SocketProvider>
    </Provider>
  );
}

function Home(){
  const style = StyleSheet.create({
    image: {
      width: 200,
      height: 50,
      resizeMode: 'contain',
      margin: 'auto'
    }
  })

  return(
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000'}}>
      <Image
        style={style.image}
        source={require('./src/assets/logo-long-yellow.png')}
      ></Image>
    </SafeAreaView>
  )
}