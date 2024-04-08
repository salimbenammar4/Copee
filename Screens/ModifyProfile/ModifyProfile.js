import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, ActivityIndicator, StyleSheet, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import styles from '../Login/style'
import { FIREBASE_AUTH, database, db, storage } from '../../firebase';
import { query, where, getDocs, updateDoc, doc, collection, deleteDoc, getDoc } from '@firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { get, ref as ref2, set } from "firebase/database";
import { useEffect } from 'react';
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { getAuth, deleteUser } from "firebase/auth";

const ModifyProfile = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState("https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg");
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [adresse, setAdresse] = useState('');
    const userId=FIREBASE_AUTH.currentUser.uid;
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const useNavigation=navigation
    useEffect(() => {
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
    }, [userId]);



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            if (result.uri) {
                setSelectedImage(result.uri);
                console.log(result.uri);
            } else if (result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri);
                console.log(result.assets[0].uri);
            } else {
                console.log("Unable to retrieve image URI from result object:", result);
            }
        }
    };

    const uploadImage = async () => {
        if (!userId) {
            console.error("User ID is undefined.");
            return;
        }
        try {
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            const storageRef = ref(storage, `profiles/${userId}/${new Date().toISOString()}`);
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            await set(ref2(database, `Profile-IDs/${userId}`), { profile_picture: downloadURL });
            console.log("Image uploaded successfully:", downloadURL);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
      
    

    const onSaveChanges = async () => {
        if (selectedImage !== "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg") {
            setLoading(true);    
        await uploadImage();
        }
        try {
            const userEmail = FIREBASE_AUTH.currentUser.email;
            const userQuery = query(
                collection(db, 'users'),
                where('Email', '==', userEmail)
            );
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                const updatedData = {};
                if (nom !== '') updatedData['Nom'] = nom;
                if (prenom !== '') updatedData['Prenom'] = prenom;
                if (adresse !== '') updatedData['Adresse'] = adresse;
                await updateDoc(docRef, updatedData);
                Alert.alert(
                    "Succées",
                    "Modifications effectuées avec succées",
                    [
                        {
                            text: "Parfait!",
                            onPress: () => navigation.navigate("Profile"),
                            
                        },
                    ],
                    { cancelable: false }
                );
                console.log('Document updated successfully');
            } else {
                console.log('No matching document found');
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
        finally {
            setLoading(false);
        }
    };
    
    const onDelete = () => {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Annulation de la suppression"),
                    style: "cancel"
                },
                { 
                    text: "Supprimer", 
                    onPress: async () => {
                        const userId = FIREBASE_AUTH.currentUser.uid; 
console.log(userId);

if (!userId) {
    console.error("User ID is undefined.");
    return;
}

try {

        const userDocRef = doc(db, 'users',userId);
        await deleteDoc(userDocRef);
        await deleteUser(user);
        console.log("User account deleted successfully.");
        navigation.navigate('Welcome');
} catch (error) {
    console.error("Error deleting user account:", error);
}
                    },
                    style: "destructive"
                }
            ],
            { cancelable: false }
        );
    };
    

    return (
        <ImageBackground source={require('../../assets/panel2.jpg')} style={style.background}>
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 22 }}>
            <View style={{ marginHorizontal: 12, flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => Navigation.goBack()} style={{ position: "absolute", left: 0 }}></TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity onPress={pickImage} style={{marginTop:20}}>
                        <Image
                            source={{ uri: selectedImage }}
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 2,
                            }}
                        />
                        <View style={{ position: "absolute", bottom: 0, right: 10, zIndex: 9999 }}>
                            <MaterialIcons name='photo-camera' size={32} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: "column", marginBottom: 6 }}>
                            <Text style={{ fontSize: 16, lineHeight: 20, color:'white' }}>Nom:</Text>
                            <View style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 0
                            }}>
                                <TextInput
                                    placeholder="Nom"
                                    placeholderColor="#000000"
                                    style={{
                                        height: 43,
                                        fontSize: 14,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: "#eaeaea",
                                        backgroundColor: "#fafafa",
                                        marginTop: 5,
                                        marginBottom: 5,
                                        width: 300,
                                    }}
                                    value={nom}
                                    onChangeText={(text) => setNom(text)}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: "column", marginBottom: 6 }}>
                            <Text style={{ fontSize: 16, lineHeight: 20, color:'white' }}>Prénom:</Text>
                            <View style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 0
                            }}>
                                <TextInput
                                    placeholder="Prénom"
                                    placeholderColor="#000000"
                                    style={{
                                        height: 43,
                                        fontSize: 14,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: "#eaeaea",
                                        backgroundColor: "#fafafa",
                                        marginTop: 5,
                                        marginBottom: 5,
                                        width: 300,
                                    }}
                                    value={prenom}
                                    onChangeText={(text) => setPrenom(text)}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: "column", marginBottom: 6 }}>
                            <Text style={{ fontSize: 16, lineHeight: 20, color:'white' }}>Adresse:</Text>
                            <View style={{
                                height: 44,
                                width: "100%",
                                borderColor: 'rgba(84, 76, 76, 0.14)',
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 0
                            }}>
                                <TextInput
                                    placeholder="Adresse"
                                    placeholderColor="#000000"
                                    style={{
                                        height: 43,
                                        fontSize: 14,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: "#eaeaea",
                                        backgroundColor: "#fafafa",
                                        marginTop: 5,
                                        marginBottom: 5,
                                        width: 300,
                                    }}
                                    value={adresse}
                                    onChangeText={(text) => setAdresse(text)}
                                />

                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: "column", marginBottom: 1 }}>
                            <Button
                                buttonStyle={[styles.loginButton, { width: 300 }]}
                                onPress={() => onSaveChanges()}
                                title="Effectuer les changements"
                            />
                        </View>
                        <View style={{ flexDirection: "column", marginBottom: 1 }}>
                            <Button
                                buttonStyle={[styles.loginButton, { width: 300 }]}
                                onPress={() => onDelete()}
                                title="Supprimer le compte"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
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
export default ModifyProfile;
