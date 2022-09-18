import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { chatReducer, objectAdd } from "../redux/chat";
import { callSettingReducer } from "../redux/callSettings";


// Components
import ChatSideMenu from "../chat/ChatSideMenu/ChatSideMenu";

// Library
import { SocketContext } from "../subcomponents/Socket";
import { postRequest, errorManagement } from "../api/api";

export default function Chat({ navigation }){
    const socket = useContext(SocketContext)
    const dispatch = useDispatch();
    const current = useSelector((state) => state.chatReducer.value.current)
    const USER_DATA = useSelector((state) => state.chatReducer.value.USER_DATA)
    const isMobile = useSelector((state) => state.chatReducer.value.isMobile)
    const chat = useSelector((state) => state.chatReducer.value.chat)
    const callSettings = useSelector((state) => state.callSettingReducer)

    //Chat Window States
    const chat_window = useSelector((state) => state.chatReducer.value.chat_window) //Data for the purpose behind popup Window
    const isChat_window = useSelector((state) => state.chatReducer.value.isChat_window) //true or false

    const inputRef = useRef();
    const [access, setAccess] = useState(false)

    // Socket routes
    useEffect(() => {
        if(USER_DATA){
            socket.connect()

            socket.on('connect', () => {
                socket.emit('join', USER_DATA.account_id)
            })

            socket.on('message', socketMessage)
            socket.on('typing', socketTyping)
            socket.on('remove', socketRemove)
            socket.on('group-exit', socketExit)
            socket.on('group-join', socketJoin)

            //Call routes
            socket.on('call-init', (data) => { 
                callInit(data, socket) 
            })
            socket.on('call-join', callJoin)
        }

        return(() => {
            socket.removeAllListeners()
            socket.disconnect()
        })
    }, [USER_DATA])

    // Check if user exists
    useEffect(() => {

        if (localStorage.getItem('user')) {
            var user = JSON.parse(localStorage.getItem('user'))

            postRequest('accounts', {
                account: user.id,
                username: user.username
            })
            .then((response) =>{
                setAccess(true)
                getHistory();
                dispatch(objectAdd({key: 'USER_DATA', value: response}))
            })
            .catch((err) => {
              
              setTimeout(() => {
                router.push("/login/")
              }, 3000)
            })
        } else {
          router.push("/login/");
        }

    }, [])

    return(
        <View>
            <ChatSideMenu socket={socket}/>

        </View>
    )
}