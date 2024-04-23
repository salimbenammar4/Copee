import React, { useState } from "react";
import { ImageBackground, StatusBar } from 'react-native';
import styles from "../Login/style";
import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View, ActivityIndicator, ScrollView,StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { FIREBASE_AUTH, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const Form = () =>{
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('admin');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const onSignupPress = async () => {
        try {
          if (password !== repeatPassword) {
            throw new Error('Les mots de passe ne correspondent pas');
          }
          setLoading(true);
          const email = generateEmail();
          const response = await createUserWithEmailAndPassword(auth, email, password);
          await saveDataToFirestore(response.user.uid, email);
          setLoading(false);
          alert('Création d`un nouveau compte réussite!')
        } catch (error) {
          let errorMessage = 'Vérifiez vos données';
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'L\'adresse e-mail est déjà utilisée';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'L\'adresse e-mail est invalide';
          } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Le mot de passe est trop faible';
          } else if (error.message) {
            errorMessage = error.message;
          }
          setLoading(false);
          setError(errorMessage);
          console.log(error);
        }
    };

    const generateEmail = () => {
        const domain = role === 'admin' ? '@copeeadmin.eu' : '@copeepers.eu';
        const username = nom.toLowerCase(); 
        return `${username}${domain}`; 
    };

    const saveDataToFirestore = async (userId, email) => {
        try {
          const collectionName = role === 'admin' ? 'Admins' : 'Personnel';
          const docRef = await addDoc(collection(db, collectionName), {
            UserId: userId,
            Email: email,
            Nom: nom,
            Prenom: prenom,
            PhoneNumber: phoneNumber
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
          setError("Error saving data. Please try again later.");
        }
    };

    const goToManage = () => {
        navigation.navigate('ManageUsers');
    };

    return (
      <ImageBackground source={require('../../assets/ad.jpg')} style={style.background}>
        <>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Picker
                      selectedValue={role}
                      onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                    >
                      <Picker.Item label="Admin" value="admin" style={{backgroundColor:'white'}} />
                      <Picker.Item label="Personnel" value="personnel" />
                    </Picker>
                 
                  <TextInput
                    placeholder="Nom"
                    style={styles.loginFormTextInput}
                    value={nom}
                    onChangeText={setNom}
                  />
                  <TextInput
                    placeholder="Prénom"
                    style={styles.loginFormTextInput}
                    value={prenom}
                    onChangeText={setPrenom}
                  />
                  <TextInput
                    placeholder="Numéro de téléphone"
                    style={styles.loginFormTextInput}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                  <TextInput
                    placeholder="Mot de passe"
                    placeholderColor="#c4c3cb"
                    style={styles.loginFormTextInput}
                    name="password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <TextInput
                    placeholder="Répéter le mot de passe"
                    style={styles.loginFormTextInput}
                    secureTextEntry={true}
                    value={repeatPassword}
                    onChangeText={(text) => setRepeatPassword(text)}
                  />
                  

                  <Button
                    buttonStyle={styles.loginButton}
                    onPress={() => onSignupPress()}
                    title="Créer un compte"
                  />
                  <Button
                    buttonStyle={[styles.loginButton, { backgroundColor: '#65539E' }]}
                    onPress={() => goToManage()}
                    title="Annuler"
                  />
                  {loading && <ActivityIndicator size="large" color="#0000ff" />}
                  {error && <Text style={{ color: 'red' }}>{error}</Text>}
                </View>
              </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </>
        </ImageBackground>
      );
    }
export default Form;

const style=StyleSheet.create({
  background:{
    flex: 1,
    resizeMode: 'cover',
  },}
)