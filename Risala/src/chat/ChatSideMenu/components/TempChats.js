import React from "react";
import { useDispatch, useSelector }     from "react-redux";
import { Pressable, View, Text, Image, ScrollView} from "react-native";
import { timeStamp } from "../../../lib/timeStamp";
import { chatReducer, arrayEmpty } from "../../../redux/chat";

export default function TempChats({tempChats, conversationSelect}){
    const dispatch = useDispatch();
    const newMessage = useSelector((state) => state.chatReducer.value.newMessage)
    const current = useSelector((state) => state.chatReducer.value.current)
    const typing = useSelector((state) => state.chatReducer.value.typing)
    const USER_DATA = useSelector((state) => state.chatReducer.value.USER_DATA)

    return(
        <>
            {
                tempChats.map((value, index) => {
                    var text = undefined;
                    if((value.recent_message.files === "1" || value.recent_message.files === true) && value.recent_message.text === ""){
                        text = "Files"
                    } else{
                        text = value.recent_message.text
                    }
                    if(current){
                        if(current.id === value.id){
                            var current_selected = true
                        } else {
                            var current_selected = false
                        }
                    }
                    if(current && typing.chat_id !== undefined && typing.chat_id.length > 0){
                        var match = typing.chat_id.filter(e => e === value.id);
                    }
                    //Filter out your own account array
                    if(value.members){
                        var members = [...value.members].filter((e) => e.id !== USER_DATA.account_id)
                    }

                    if(value.nicknames){
                        var nicknames = JSON.parse(value.nicknames)
                        if(nicknames.find((e) => e.id !== USER_DATA.account_id)){
                            var nickname = nicknames.find((e) => e.id !== USER_DATA.account_id).nickname
                        }
                    } else {
                        var nickname = undefined;
                    }
                    
                    
                    //timestamp fix
                    var time_stamp = timeStamp(value.recent_message.timestamp, false)
                    return(
                        <Pressable
                            data_id={value.id}
                            user_id={value.sender_id === USER_DATA.account_id ? value.reciever_id : value.sender_id}
                            data_selected={(current_selected === true && !newMessage.is_searching) ? "true" : "false"}
                            key={value + index}
                            onPress={(() => { conversationSelect(value.id)})}
                            style={{width: '100%', flexDirection: 'row', paddingTop: 8, paddingBottom: 8, alignItems: 'center'}}
                        >
                            {
                                members.length === 1 &&
                                <Image source={{uri: members[0].profile_picture ? `https://risala.codenoury.se/${members[0].profile_picture.substring(3)}` : "https://codenoury.se/assets/generic-profile-picture.png"}}/>
                            }
                            {
                                members.length > 1 &&
                                <View>
                                    <Image source={{uri: members[0].profile_picture ? `https://risala.codenoury.se/${members[0].profile_picture.substring(3)}` : "https://codenoury.se/assets/generic-profile-picture.png"}}/>
                                    <Image source={{uri: members[1].profile_picture ? `https://risala.codenoury.se/${members[1].profile_picture.substring(3)}` : "https://codenoury.se/assets/generic-profile-picture.png"}}/>
                                </View> 
                            }
                            <View className="chat-info">
                                <Text className="preview-text">
                                {
                                    members.length === 1 &&
                                    <>
                                        {
                                            nickname ?
                                            <Text className="preview-text">{nickname}</Text>
                                            :
                                            <Text className="preview-text">{members[0].firstname + ' ' + members[0].lastname}</Text>
                                        }
                                    </>
                                }
                                {
                                    (members.length > 1 && !value.alias) &&
                                    members.map((e, i, row) => {
                                        if(i + 1 === row.length){
                                            return `${e.firstname}`
                                        } else {
                                            return  `${e.firstname}, `
                                        }
                                    })
                                }
                                {
                                    (members && value.alias) &&
                                    <Text className="preview-text">{value.alias}</Text>
                                }
                                </Text>
                                <View className="chat-preview">
                                    <Text>
                                        {
                                            value.sender_id === USER_DATA.account_id ?
                                            `You: ${text.length > 24 ? (text.substring(0, 24) + '...') : text}` 
                                            :
                                            `${text.length > 30 ? text.substring(0, 30) + '...' : text}`
                                        }
                                    </Text>
                                    {
                                        (match === undefined || match.length === 0) ?
                                        <Text>&#183; {time_stamp}</Text>
                                        : ""
                                    }
                                </View> 
                            </View>
                        </Pressable>
                    )
                })
            }
        </>
    )
}