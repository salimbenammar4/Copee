import { SafeAreaView } from "react-native-safe-area-context";
import ChatList from "../components/ChatList";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";

const ChatScreen = () => {
  return (
    <ImageBackground source={require('../assets/abcdefg.jpg')} >
    <>
    <StatusBar backgroundColor="white" barStyle="light-content" />
    <SafeAreaView>
      <ChatList />
    </SafeAreaView></></ImageBackground>
  );
};

export default ChatScreen;
