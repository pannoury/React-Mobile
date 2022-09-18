import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getStorage, setStorage } from "../lib/asyncStorage";
import { postRequest } from "../api/api";

// Styles
import { globalStyles } from "../styles/styles";

export default function Login({ navigation }){
    const [usernameInput, setUserNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [isWrong, setIsWrong] = useState(false)

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

    useEffect(() => {
        console.log(usernameInput)
    }, [usernameInput])

    function signIn(){
        console.log(usernameInput, passwordInput)
        postRequest('login', {
            username: usernameInput,
            password: passwordInput
        })
        .then((response) => {
            if(response === "No match was found"){
                setIsWrong(true)
            } else {
                setIsWrong(false)
                setStorage('user', JSON.stringify({response}))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <ScrollView style={{minHeight: '100%', backgroundColor: '#000'}}>
            <View style={style.container}>
                <View style={{width: '90%', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Image
                        style={style.logo} 
                        source={require('../assets/logo-long-yellow.png')}
                    ></Image>
                    <Text style={globalStyles.text.whiteHeader}>Sign in</Text>
                    <Text style={globalStyles.text.subText}>
                        Enter your credentials to access the chat application
                    </Text>
                </View>
                {
                    isWrong &&
                    <View style={style.wrongDiv}>
                        <Text style={{color: "#fff", fontSize: 12, fontWeight: 'bold'}}>
                            Wrong username/password entered. Please try again
                        </Text>
                    </View>
                }
                <View style={{width: '90%'}}>
                    <Text style={globalStyles.text.label}>Username</Text>
                    <TextInput
                        style={style.input}
                        placeholder="joe@hotmail.com"
                        onChangeText={setUserNameInput}
                        value={usernameInput}
                    >
                    </TextInput>
                </View>
                <View style={{width: '90%'}}>
                    <Text style={globalStyles.text.label}>Password</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={setPasswordInput}
                        value={passwordInput}
                        secureTextEntry={true}
                    >
                    </TextInput>
                </View>
                <View
                    style={{flexDirection: 'column'}}
                >
                    <Button
                        title="Sign in"
                        color={'#ffb301'}
                        style={globalStyles.button}
                        onPress={signIn}
                    />
                    <View style={style.flexRow}>
                        <Text style={globalStyles.colors.white} >Don't have an account?</Text>
                        <Text style={style.link}>Sign up</Text>
                    </View>
                    <View style={style.flexRow}>
                        <Text style={globalStyles.colors.white}>Forgotten your password?</Text>
                        <Text style={style.link}>Restore account</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#000',
        height: '100%',
        width: '100%'
    },
    flexRow: {
        flexDirection: 'row'
    }, 
    color: {
        color: '#ffb301'
    },
    header: {
        fontSize: 40
    },
    logo: {
        width: 200,
        height: 50,
        resizeMode: 'contain',
        margin: 'auto'
    },
    input: {
        ...globalStyles.input,
        width: '90%'
    },
    link: {
        color: '#ffb301',
        marginLeft: 10
    },
    wrongDiv: {
        backgroundColor: 'red',
        borderRadius: 6,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: '90%',
        marginTop: 20,
        marginBottom: 20,
    }
})