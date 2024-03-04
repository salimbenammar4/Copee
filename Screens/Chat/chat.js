import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { TouchableOpacity, Text } from "react-native";
import { collection, addDoc, orderBy, query, onSnapshot } from "@firebase/firestore";
import { FIREBASE_AUTH, database } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
export default function Chat() {
    const [messages, setMessages] = useState([]);
    const onSend=useCallback((messages= [])=>{
        setMessages(previousMessages=>GiftedChat.append(previousMessages,messages))
    })

    return (
        <GiftedChat
            messages={messages}
            onSend={(newMessages) => setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages))}
            user={{
                _id: 1, // user id
            }}
        />
    );
        }
