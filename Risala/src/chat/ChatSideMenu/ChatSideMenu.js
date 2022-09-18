import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { chatReducer, arrayEmpty } from "../../redux/chat";

// Components

export default function ChatSideMenu({}){
    const dispatch = useDispatch();
    const newMessage = useSelector((state) => state.chatReducer.value.newMessage)
    const current = useSelector((state) => state.chatReducer.value.current)
    const chats = useSelector((state) => state.chatReducer.value.chats)
    const typing = useSelector((state) => state.chatReducer.value.typing)
    const USER_DATA = useSelector((state) => state.chatReducer.value.USER_DATA)
    const noConversations = useSelector((state) => state.chatReducer.value.noConversations)

    const [tempChats, setTempChats] = useState(undefined) //Temp chat are chats which you have searched
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!chats && !noConversations){
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [chats])

    function conversationSelect(e){
        var chat_id = e.currentTarget.getAttribute('data_id')

        if(chats.length >= 2 && current.id !== chat_id){
            var selected = e.currentTarget.getAttribute('data_selected')
            var x = document.querySelectorAll('[data_selected="true"]')
        
            if(x.length > 0){
                x.forEach((e) => {
                    e.setAttribute('data_selected', 'false')
                })
            }
        
            if(selected === "false"){
                e.currentTarget.setAttribute('data_selected', 'true')
            } else {
                e.currentTarget.setAttribute('data_selected', 'false')
            }
            
            dispatch(chatReducer({current: chats.find(e => e.id === chat_id)}))
        } else if(chats.length >= 1 && !current){ //this is when your first conversation was initated by someone else
            dispatch(chatReducer({current: chats.find(e => e.id === chat_id)}))
        }
    }

    // Build some sort of algorithm
    // This is an effort to reduce strains on backend
    function conversationSearch(e){
        var value = e.currentTarget.value
        
        if(value.length > 0 && !newMessage.is_searching){
            if(!tempChats){
                setLoading(true)
            }

            var chatMatches = []
            var searchString = value.toLowerCase()

            // Version 2
            var finalScore = searchFunction(searchString, chats, USER_DATA)

            var temporaryChatMatches = finalScore
            setTempChats(temporaryChatMatches)
            setLoading(false)
            
        } else {
            setTempChats(undefined)
            setLoading(false)
        }
    }

    //navigation.push('Profile', { owner: 'Michaś' });

    return(
        <View>

        </View>
    )
}