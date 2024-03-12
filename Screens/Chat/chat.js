import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, query, onSnapshot } from "@firebase/firestore";
import { FIREBASE_AUTH, db } from "../../firebase"; 
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { setDoc, doc } from "@firebase/firestore";

export default function Chat() {
    const {params}=useRoute();
    const {ChatId}=params;
    const user = FIREBASE_AUTH.currentUser;
    const [messages, setMessages] = useState([]);
    const [recieverId, setRecieverId] = useState(ChatId);
    const messagesRef = collection(db, "users", recieverId, "messages");

    useEffect(() => {
        if (user.email.endsWith('@copeeadmin.eu') && ChatId){
            setRecieverId(ChatId);
        }
        const unsubscribe = onSnapshot(
            query(messagesRef, orderBy("createdAt", "desc")),
            (snapshot) => {
                const newMessages = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        _id: doc.id,
                        text: data.text,
                        createdAt: data.createdAt.toDate(),
                        user: data.user ? {
                            _id: data.user.uid || 'unknown', 
                            name: data.user.Nom || "Anonymous",
                            avatar: data.user.photoURL || "",
                        } : {
                            _id: "unknown",
                            name: "Unknown",
                            avatar: "",
                        },
                    };
                });
                setMessages(newMessages);
            }
        );

        return () => unsubscribe();
    }, []);

    // Send a new message
    const onSend = useCallback(async (newMessages = []) => {
        try {
            await addDoc(messagesRef, {
                text: newMessages[0].text,
                createdAt: new Date(),
                user: {
                    _id: user.uid,
                    name: user.displayName,
                    avatar: user.photoURL, 
                }
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            
        />
    );
}
