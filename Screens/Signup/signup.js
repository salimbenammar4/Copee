import React, { useState } from "react";
import { ImageBackground, StatusBar } from 'react-native';
import styles from "./style";
import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View, Image, ActivityIndicator, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { FIREBASE_AUTH, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { sendEmailVerification } from "firebase/auth";

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const sendEmailVerificationCustom = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log("Email verification sent.");
    } catch (error) {
      console.error("Error sending email verification: ", error);
      throw error;
    }
  };

  const onSignupPress = async () => {
    try {
      if (password !== repeatPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      setLoading(true);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerificationCustom(response.user);
      await saveDataToFirestore(response.user.uid);
      setLoading(false);
      alert('Création d`un nouveau compte réussite! Veuillez vérifier votre adresse e-mail pour activer votre compte.');
      navigation.navigate('Login');
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

  const saveDataToFirestore = async (userId) => {
    try {
    
      const docRef = await setDoc(doc(db, "users", userId), {
        UserId: userId,
        Email: email,
        Nom: nom,
        Prenom: prenom,
        Adresse: adresse,
        PhoneNumber: phoneNumber 
      });
    
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Error saving data. Please try again later.");
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <View style={styles.hero}>
                <Image source={{ uri: 'https://www.copee.eu/wp-content/uploads/2022/01/logo-white-02-3.png' }} style={styles.heroimg} resizeMode="contain" />
              </View>
              <Text style={styles.logoText}>Joignez-nous!</Text>
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
                placeholder="Adresse"
                style={styles.loginFormTextInput}
                value={adresse}
                onChangeText={setAdresse}
              />
              <TextInput
                placeholder="Numéro de téléphone" 
                style={styles.loginFormTextInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber} 
              />
              <TextInput
                placeholder="Email"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
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
                onPress={() => goToLogin()}
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
  );
}

export default SignupScreen;
