import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import { getAuth } from "firebase/auth";

const ChatList = () => {
  const [friends, setFriends] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(
    () =>{
      onSnapshot(
        query(
          collection(db,"users")
        ),
        (snapshot) =>
          setFriends(
            snapshot.docs.map((doc) => (doc.data()))
          )
      );
     },
    [user]
  );

  return friends.length > 0 ? (
    <FlatList
      className="h-full"
      data={friends}
      keyExtractor={(item) => item.UserId}
      renderItem={({ item }) => <ChatRow userDetails={item} />}
    />
  ) : (
    <View>
      <Text>pas de clients!</Text>
    </View>
  );
};

export default ChatList;
