import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../Login/style';

const Domotique = () => {
    const navigation = useNavigation();

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
                    <Text style={{ fontSize: 15, lineHeight: 20, marginTop: 10, textAlign: "center", marginBottom: 10, color:'white' }}>Domotique pour photovoltaïque</Text>
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
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>La domotique couplée au photovoltaïque permet d’avoir un visuel sur:</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> l’énergie générée en temps réel</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> l’énergie retirée ou injectée au réseau en temps réel</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> l’énergie consommée en temps réel</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> l’énergie disponible pour l’autoconsommation en temps réel</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> des Notifications d’alarme</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> le tout piloté par une application gratuite et sans abonnement pour iOs et Android</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Indépendant de l’onduleur et des compteurs</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Jusqu’à 20 ans de stockage de données</Text>

            </View>


                <View style={styles.hero}>
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>L’autoconsommation simplifiée.</Text>
                <Image
                        source={require('../../assets/domop.jpg')}
                        style={{ width: 290, height: 200, borderRadius:20, alignSelf:'center', marginTop:20  }}
                    />
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, }}>Elios4you est un moyen innovent pour optimiser l’autoconsommation et suivre votre installation PV via une application intelligente, développée par 4-noks. Les données, en direct, sont disponibles sur n’importe quel smartphone ou tablette et accessibles n’importe où, n’importe quand. Elios4you mesure très précisément l’énergie générée, consommée, et échangée avec le réseau, la consommation globale de la maison ainsi que le niveau d’autoconsommation atteint.</Text>
                    <Image
                        source={require('../../assets/Domotique-1.png')}
                        style={{ width: 290, height: 200, borderRadius:20, alignSelf:'center', marginTop:20  }}
                    />
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
      }
});

export default Domotique;
