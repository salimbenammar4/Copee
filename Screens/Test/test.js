import React, { useState } from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/style';
import { Picker } from '@react-native-picker/picker';
const Test = () => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState(''); // State for selected option

    const handleOptionChange = (itemValue) => {
        setSelectedOption(itemValue);
    };

    return (
        <ImageBackground source={require('../../assets/domo.png')} style={style.background}>
        <>
            <StatusBar backgroundColor="#8c919a" barStyle="light-content" />

            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.openDrawer()}
                >
                    <MaterialCommunityIcons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, lineHeight: 20, marginTop: 10, textAlign: "center", marginBottom: 10, color:'white' }}>Test d'Eligibilité</Text>
                </View>
                <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <MaterialCommunityIcons name="account-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>
            
            <ScrollView>
                <View style={styles.hero}>
                    <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>Test d'éligibilité</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, textAlign:'center' }}>Si votre propriété peut faire l’objet d’un projet de rénovation, vous pouvez certainement bénéficier de nombreuses aides !</Text>
                    <TextInput
                        placeholder="Numéro de téléphone"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                    />
                    <TextInput
                        placeholder="Facture mensuelle"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                    />
                    <TextInput
                        placeholder="Revenu fiscal de référence"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                    />
                    <View style={style.pickerContainer}>
                        <Picker
                            selectedValue={selectedOption}
                            onValueChange={(itemValue, itemIndex) => handleOptionChange(itemValue)}
                            style={style.picker}
                        >
                            <Picker.Item label="Nombre de personnes à charge" value="" />
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
                    <View style={style.pickerContainer}>
                        <Picker
                            selectedValue={selectedOption}
                            onValueChange={(itemValue, itemIndex) => handleOptionChange(itemValue)}
                            style={style.picker}
                        >
                            <Picker.Item label="Je suis propriétaire depuis plus de 2 ans" value="" />
                            <Picker.Item label="Oui" value="Oui" />
                            <Picker.Item label="Non" value="Non" />
                        </Picker>
                    </View>
                    <View style={style.pickerContainer}>
                        <Picker
                            selectedValue={selectedOption}
                            onValueChange={(itemValue, itemIndex) => handleOptionChange(itemValue)}
                            style={style.picker}
                        >
                            <Picker.Item label="Type de bien" value="" />
                            <Picker.Item label="Maison" value="Maison" />
                            <Picker.Item label="Appartement" value="Appartement" />
                        </Picker>
                    </View>
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
    btn:{
        marginTop:15,
        backgroundColor:'#FF4433',
        paddingVertical:12,
        paddingHorizontal:14,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:14,
    },
    btnText:{
        fontSize:15,
        fontWeight:'500',
        color:'white',
    },
    pickerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Match background color of text inputs
        borderRadius: 10, // Match border radius of text inputs
        marginTop: 10,
        marginLeft: 7,
        marginRight: 45,
        marginBottom: 0,
        borderWidth: 1, // Match border width of text inputs
        borderColor: '#fff', // Match border color of text inputs
    },
    picker: {
        color: '#000', // Match text color of text inputs
        height: 50,
        width: '100%',
    },
});


export default Test;
