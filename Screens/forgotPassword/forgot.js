import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator } from "react-native";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigation = useNavigation();
  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      Alert.alert('Succées', 'Email de réinitialisation de mot de passe est envoyé');
    } catch (error) {
      setLoading(false);
      const errorMessage = error.message;
      setAuthError(errorMessage);
      Alert.alert('Error', errorMessage);
    }
  };
const goback = () =>{
    navigation.navigate('Login')
}
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
              <Text style={styles.logoText}>Mot de passe oublié?</Text>
              <Text style={{ textAlign: 'center', color: "black" }}>Veuillez entrer votre Email pour récouvrir votre mot de passe</Text>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#000000"
                style={styles.loginFormTextInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TouchableOpacity onPress={handleResetPassword}>
                <View style={[styles.loginButton, { width: 320 }]}>
                  <Text style={[styles.buttonText, { textAlign: 'center', marginTop:15, color:'white' }]}>Envoyer</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={goback}>
                <View style={[styles.loginButton, { width: 320 }]}>
                  <Text style={[styles.buttonText, { textAlign: 'center', marginTop:15, color:'white' }]}>Annuler</Text>
                </View>
              </TouchableOpacity>
              {loading && <ActivityIndicator size="large" color="#0000ff" />}
              {authError && <Text style={{ color: 'red', textAlign: 'center' }}>{authError}</Text>}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgotPasswordScreen;
