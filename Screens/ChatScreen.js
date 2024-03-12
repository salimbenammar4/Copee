import { SafeAreaView } from "react-native-safe-area-context";
import ChatList from "../components/ChatList";


const ChatScreen = () => {
  return (
    <SafeAreaView>
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
