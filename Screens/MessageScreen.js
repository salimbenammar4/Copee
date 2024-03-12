import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import 'tailwindcss/tailwind';

const MessagesScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { params } = useRoute();
  const { userDetails } = params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db,"users",userDetails.UserId ,"messages"),
          orderBy("createdAt", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [userDetails, db]
  );

  const sendMessage = () => {
    if (input === "") return;
    addDoc(collection(db,"users",userDetails.UserId ,"messages"), {
      createdAt: serverTimestamp(),
      userId: user.uid,
      text: input,
    });
  
    setInput("");
  };
  return (
    <SafeAreaView className="flex-1">

      <KeyboardAvoidingView
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={true}
            className="pl-4"
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message}  />
              ) : (
                <ReceiverMessage key={message.id} message={message} selectedImage={userDetails.SelectedImage} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2 bg-white">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Text className="text-[#FF5864] text-lg">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
