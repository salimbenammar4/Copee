import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { get, ref as ref2,  } from "firebase/database";
import { database, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";


const ChatRow = ({ userDetails }) => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [lastMessage, setLastMessage] = useState("") ;
  const DefaultImage="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
  const [details, setdetails] = useState({...userDetails,...{SelectedImage:DefaultImage}})
  useEffect(() => {
    console.log(userDetails);
    fetchProfilePicture();
    try {
      onSnapshot(
        query(
          collection(
            db,
            "users",
           userDetails.UserId,
            "messages"
          ),
          orderBy("createdAt", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      );
    } catch (error) {
      console.log(error);
    }
  }, [userDetails, db]);
  const fetchProfilePicture = async () => {
    try {
        const profileRef = ref2(database, `Profile-IDs/${userDetails.UserId}`);
        const profileSnapshot = await get(profileRef);
        const profileData = profileSnapshot.val();
        if (profileData && profileData.profile_picture) {
            setdetails({...details, ...{SelectedImage:profileData.profile_picture}});
        }
    } catch (error) {
        console.error("Error fetching profile picture:", error);
    }
};
  return (
    <View
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.cardShadow}
    >
      <TouchableOpacity
        onPress={()=>{}}
      >
        <Image
          className="rounded-full h-16 w-16 mr-4"
          source={{
            uri: details.SelectedImage,
          }}
          // userDetails?.photoURL
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MessageScreen", {
            userDetails:details,
          })
        }
      >
        <View>
          <Text className="text-lg font-semibold">
            {userDetails?.Nom} {userDetails?.Prenom}
          </Text>
          <Text>{lastMessage || "Say Hi!👋 "}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
