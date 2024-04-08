import React, { useState } from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, StyleSheet, ScrollView, TextInput, Dimensions, Touchable, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/style';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';

const { width } = Dimensions.get('window');

const Test = () => {
    const navigation = useNavigation();
    const [selectedOption1, setSelectedOption1] = useState('1');
    const [selectedOption2, setSelectedOption2] = useState('Oui');
    const [selectedOption3, setSelectedOption3] = useState('Panneaux Solaires');
    const [selectedOption4, setSelectedOption4] = useState('Matin');
    const [FactureMensuelle, setFactureMensuelle] = useState('');
    const [RevenuFiscal, setRevenuFiscal] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;

    const saveTestToFirestore = async () => {
        if (RevenuFiscal === "" || FactureMensuelle === "") {
          alert("Vérifiez les champs");
          return;
        }
      
        const docRef = await addDoc(collection(db, "users", user.uid, "Tests"), {
            userId: user.uid,
          createdAt: serverTimestamp(),
          FactureMensuelle: FactureMensuelle,
          RevenuFiscal: RevenuFiscal,
          NbPersonnes: selectedOption1,
          Proprietaire: selectedOption2,
          TypeInstallation: selectedOption3,
          Contact: selectedOption4,
          Status: 'En Attente...'
        });
      
        const testId = docRef.id;
      
        // Now update the document with the testId
        await updateDoc(doc(db, "users", user.uid, "Tests", docRef.id), {
          testId: testId
        });
      
        Alert.alert(
          "Succées",
          "Vous avez ajouté une demande de test d'éligibilité. Le Personnel va vous contacter aussi vite que possible.",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("MyTests")
            }
          ],
          { cancelable: false }
        );
      };

    
    return (
        <ImageBackground source={require('../../assets/domo.png')} style={style.background}>
            <>

                <View style={style.header}>
                    <TouchableOpacity
                        style={style.menuButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <MaterialCommunityIcons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>Test d'Eligibilité</Text>
                    </View>
                    <TouchableOpacity
                        style={style.profileButton}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <MaterialCommunityIcons name="account-circle" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                
                <ScrollView>
                    <View style={styles.hero}>
                        <Text style={style.subtitle}>Si votre propriété peut faire l’objet d’un projet de rénovation, vous pouvez certainement bénéficier de nombreuses aides !</Text>
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Facture Mensuelle:</Text>
                        <TextInput
                            placeholder="Facture mensuelle"
                            placeholderColor="#c4c3cb"
                            style={styles.loginFormTextInput}
                            onChangeText={setFactureMensuelle}
                        />
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Revenu fiscal de référence:</Text>
                        <TextInput
                            placeholder="Revenu fiscal de référence"
                            placeholderColor="#c4c3cb"
                            style={styles.loginFormTextInput}
                            onChangeText={setRevenuFiscal}
                        />
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Nombre de personnes à charge :</Text>
                        <View style={style.pickerContainer}>
                            <Picker
                                selectedValue={selectedOption1}
                                onValueChange={(itemValue, itemIndex) => setSelectedOption1(itemValue)}
                                style={style.picker}
                            >
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                                <Picker.Item label="10" value="10" />
                            </Picker>
                        </View>
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Vous êtes propriétaire depuis plus de 2 ans ?</Text>
                        <View style={style.pickerContainer}>
                            <Picker
                                selectedValue={selectedOption2}
                                onValueChange={(itemValue, itemIndex) => setSelectedOption2(itemValue)}
                                style={style.picker}
                            >
                                <Picker.Item label="Oui" value="Oui" />
                                <Picker.Item label="Non" value="Non" />
                            </Picker>
                        </View>
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Type d'installation :</Text>
                        <View style={style.pickerContainer}>
                            <Picker
                                selectedValue={selectedOption3}
                                onValueChange={(itemValue, itemIndex) => setSelectedOption3(itemValue)}
                                style={style.picker}
                            >
                                <Picker.Item label="Panneaux Solaires" value="Panneaux Solaires" />
                                <Picker.Item label="Pompe à Chaleur" value="Pompe à Chaleur" />
                                <Picker.Item label="Ballons Thermodynamiques" value="Ballons Thermodynamiques" />
                                <Picker.Item label="Ballons Solaires" value="Ballons Solaires" />
                            </Picker>
                        </View>
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Préférence pour être contacté :</Text>
                        <View style={style.pickerContainer}>
                            <Picker
                                selectedValue={selectedOption4}
                                onValueChange={(itemValue, itemIndex) => setSelectedOption4(itemValue)}
                                style={style.picker}
                            >
                                <Picker.Item label="Matin" value="Matin" />
                                <Picker.Item label="Midi" value="Midi" />
                                <Picker.Item label="Soir" value="Soir" />
                            </Picker>
                        </View>
                        <TouchableOpacity style={style.button} onPress={saveTestToFirestore}>
                            <Text style={style.buttonText}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>
        </ImageBackground>
    );
};

const style = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        marginLeft: 20,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 19,
        lineHeight: 20,
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 10,
        color: 'white',
    },
    profileButton: {
        marginRight: 20,
    },
    heroTitle: {
        textAlign: 'center',
        fontSize: 34,
        color: 'white',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
    },
    pickerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 7,
        marginRight: 45,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    picker: {
        color: 'black',
        height: 50,
        width: '100%',
    },
    button: {
        marginTop: 15,
        backgroundColor: '#FF4433',
        paddingVertical: 12,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        alignSelf: 'center', 
        width:350
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
    },
});

export default Test;
