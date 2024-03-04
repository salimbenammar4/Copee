import React, { useState, useEffect } from "react";
import { StatusBar, TouchableOpacity, View } from 'react-native'; // Import TouchableOpacity and View
import styles from "./style";
import {Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Image, ActivityIndicator} from "react-native";
import { Button } from "react-native-elements";
import { FIREBASE_AUTH } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);

  const onLoginPress = async () => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      if (response.user.email.endsWith('@copeeadmin.eu')){
        navigation.replace('dashboard')}
      else{
      if (!response.user.emailVerified) {
        alert('Veuillez vérifier votre adresse e-mail pour activer votre compte.');
        throw new Error('Veuillez vérifier votre adresse e-mail pour activer votre compte.');
      }
      navigation.replace('Home');
    }} catch (error) {
      setAuthError('Vérifiez vos données.');
      console.log(error);
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  const goToForgotPassword = () => {
    navigation.navigate('forgot')
  };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.loginFormView}>
              <View style={styles.hero}>
                <Image source={{ uri: 'https://www.copee.eu/wp-content/uploads/2022/01/logo-white-02-3.png' }} style={styles.heroimg} resizeMode="contain"/>
              </View>
              <Text style={styles.logoText}>Bienvenue</Text>
              <TextInput
                placeholder="Email"
                placeholderColor="#000000"
                style={styles.loginFormTextInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                placeholder="Mot de passe"
                placeholderColor="#000000"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={onLoginPress}
                title="Se Connecter"
              />
              <TouchableOpacity onPress={goToForgotPassword}>
                <Text style={{ textAlign: 'center', color: "black", textDecorationLine: 'underline' }}>Mot de passe oublié?</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
              </View>
              <Text style={{ textAlign: 'center', color: "black" }}>Nouveau sur COPEE ?</Text>
              <Button
                buttonStyle={styles.loginButton}
                onPress={goToSignup}
                title="Créer un compte"
              />
              {loading && <ActivityIndicator size="large" color="#0000ff" />}
              {authError && <Text style={{ color: 'red', textAlign: 'center' }}>{authError}</Text>}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

export default LoginScreen;
