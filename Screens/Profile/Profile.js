import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { query, collection, where, getDocs} from 'firebase/firestore';
import { db, FIREBASE_AUTH, database } from '../../firebase'; 
import { get, ref as ref2, set } from "firebase/database";
import { Button } from 'react-native-elements';
import styles from '../Login/style';
import { useNavigation } from "@react-navigation/native";

const Profile= () => {
  const [selectedImage, setSelectedImage] = useState("https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId=FIREBASE_AUTH.currentUser.uid;
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserData = async () => {
        console.log('Fetching user data...');
        console.log('User ID:', user?.uid);
      
        try {
          const userQuery = query(collection(db, 'users'), where('UserId', '==', user.uid));
          const querySnapshot = await getDocs(userQuery);
          
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            console.log('User data:', userDoc.data());
            setUserData(userDoc.data());
          } else {
            console.log('No matching user document found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };
      const fetchProfilePicture = async () => {
        try {
            const profileRef = ref2(database, `Profile-IDs/${userId}`);
            const profileSnapshot = await get(profileRef);
            const profileData = profileSnapshot.val();
            if (profileData && profileData.profile_picture) {
                setSelectedImage(profileData.profile_picture);
            }
        } catch (error) {
            console.error("Error fetching profile picture:", error);
        }
    };

    if (userId) {
        fetchProfilePicture();
    }
      

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const modifyprofile = () => {
    navigation.navigate('ModifyProfile'); 
  };

  const handleLogout = async () => {
    try {
        await signOut(auth);
        navigation.navigate('Login'); 
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

  return (
    <ImageBackground source={require('../../assets/image2.jpg')} style={style.background}>
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 22, marginTop:'30%' }}>
            <View style={{ marginHorizontal: 12, flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}></TouchableOpacity>
            </View>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ alignItems: "center", marginVertical: 22 }}>
        <Image
                            source={{ uri: selectedImage }}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 1,
                                borderColor: "black"
                            }}
                        />
          <Text style={{ fontSize: 20, lineHeight: 20, marginTop:20, color:'white' }}>Bienvenue {userData.Prenom}!</Text>
          <View style={{marginTop:20}}>
		<Button
                  buttonStyle={[styles.loginButton, { width: 300 }]}
                  onPress={modifyprofile}
                  title="Modifier le profil"
                />
		</View>
        <View style={{marginTop:10}}>
		<Button
                  buttonStyle={[styles.loginButton, { width: 300 }]}
                  onPress={handleLogout}
                  title="Se déconnecter"
                />
		</View>
          </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </ImageBackground>
  );
};
const style = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});
export default Profile;
