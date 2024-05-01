import React, { useState } from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, StyleSheet, ScrollView, TextInput, Dimensions, Touchable, Alert } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/style';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';
import DatePickerInput from './datepickerinput';
const { width } = Dimensions.get('window');

const DemandePompe = () => {
    const navigation = useNavigation();
    const [selectedOption1, setSelectedOption1] = useState('PAC AIR/AIR');
    const [Hauteur, setHauteur] = useState('');
    const [selectedOption2,setSelectedOption2]=useState("Plein pied");
    const [date, setDate] = useState(new Date());

    const saveDataToFirestore = async () => {
        const user = getAuth().currentUser;
        if (user) {
            try {
                const demandeData = {
                    userId: user.uid,
                    TypeInstallation:"Pompes à chaleur",
                    typeEquipement: selectedOption1,
                    typeMaison: selectedOption2,
                    hauteurMaison: Hauteur,
                    dateDebutTravail: date,
                    Status:"En cours de traitement..."
                };
                const userDemandesRef = collection(db, 'users', user.uid, 'Demandes');
                await addDoc(userDemandesRef, {
                    ...demandeData,
                    createdAt: serverTimestamp()
                });
                Alert.alert(
                    "Succées",
                    "Vous avez ajouté une demande d'installation. Le Personnel va traiter la demande aussi vite que possible.",)
            } catch (error) {
                console.error('Error adding document: ', error);
            }}}

    
    return (
        <ImageBackground source={require('../../assets/domo.png')} style={style.background}>
            <>

                <View style={style.header}>
                    <TouchableOpacity
                        style={style.menuButton}
                        onPress={() => navigation.navigate("MyTests")}
                    >
                        <AntDesign name="back" size={24} color="white"/>
                    </TouchableOpacity>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>Demande pour pompes à chaleur</Text>
                    </View>
                    
                </View>
                
                <ScrollView>
                    <View style={styles.hero}>
                        
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Type de pompe:</Text>
                        <View style={style.pickerContainer}>
                            <Picker
                                selectedValue={selectedOption1}
                                onValueChange={(itemValue, itemIndex) => setSelectedOption1(itemValue)}
                                style={style.picker}
                            >
                                <Picker.Item label="PAC AIR/AIR" value="PAC AIR/AIR" />
                                <Picker.Item label="PAC AIR/EAU" value="PAC AIR/EAU" />
                            </Picker>
                        </View>
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Type de maison :</Text>
                        <View style={style.pickerContainer}>
                            <Picker
                                selectedValue={selectedOption1}
                                onValueChange={(itemValue, itemIndex) => setSelectedOption2(itemValue)}
                                style={style.picker}
                            >
                                <Picker.Item label="Plein pied" value="Plein pied" />
                                <Picker.Item label="A niveau" value="A niveau" />
                            </Picker>
                        </View>
                        <Text  style={[style.subtitle, {textAlign: 'left'}]}>Hauteur de la maison</Text>
                        <TextInput
                            placeholder="Hauteur de la maison"
                            placeholderColor="#c4c3cb"
                            style={styles.loginFormTextInput}
                            onChangeText={setHauteur}
                        />
                        
                        <Text style={[style.subtitle, {textAlign: 'left'}]}>Date de début de travail:</Text>
                        <DatePickerInput value={date} onChange={setDate}  style={{ width: 200 }} />
                    </View>
                    <TouchableOpacity style={style.button}onPress={saveDataToFirestore}>
                            <Text style={style.buttonText}>Envoyer</Text>
                        </TouchableOpacity>
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

export default DemandePompe;
