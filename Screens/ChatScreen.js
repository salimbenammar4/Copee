import { SafeAreaView } from "react-native-safe-area-context";
import ChatList from "../components/ChatList";
import { StatusBar } from "expo-status-bar";

const ChatScreen = () => {
  return (
    <>
    <StatusBar backgroundColor="black" barStyle="light-content" />
    <SafeAreaView>
      <ChatList />
    </SafeAreaView></>
  );
};

export default ChatScreen;
