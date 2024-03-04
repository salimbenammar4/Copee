import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/style';

const NotreEquipe = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../assets/image3.jpg')} style={style.background}>
        <>
            
            <StatusBar backgroundColor="#1f85f3" barStyle="light-content" />
            
            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.openDrawer()}
                >
                    <MaterialCommunityIcons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, lineHeight: 20, marginTop: 10, textAlign: "center", marginBottom: 10, color:'white' }}>Notre Equipe</Text>
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
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>Une organisation divisée en 5 pôles!</Text>
                <Text style={{textAlign:'center', fontSize:15, fontWeight:'500', marginTop:18,color:'white' }}>Nous souhaitons vous proposer un service clé en main. C'est pourquoi nous avons organisé notre structure selon 5 pôles afin de remplir au mieux notre mission !</Text>
            </View>

            
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/admin-picto.png')} 
                        style={{ width: 230, height: 200, borderRadius: 100 }} 
                    />
                    <Text style={{ fontSize: 20, fontWeight: '500',  color:'white',fontStyle: 'italic' }}>Le Pôle Administratif</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, textAlign:'center' }}>Il est au centre de la gestion de la société COPEE. Acteur dans l'ombre, il assure votre accompagnement et la réussite de votre projet grâce aux aides gouvernementales.</Text>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/rouages-picto-1.png')} 
                        style={{ width: 200, height: 200, borderRadius: 100}} 
                    />
                    <Text style={{ fontSize: 20, fontWeight: '500',  color:'white',fontStyle: 'italic' }}>Le Pôle Technique</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, textAlign:'center' }}>Il est le garant du bon déroulé de tous vos projets de rénovation énergétique. Il valide la faisabilité du projet par le biais d'une visite technique. Il s'occupe également de la gestion des commandes ainsi que de la préparation du matériel.</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/shake.png')} 
                        style={{ width: 230, height: 200, borderRadius: 100 }} 
                    />
                    <Text style={{ fontSize: 20, fontWeight: '500',  color:'white',fontStyle: 'italic' }}>Le Pôle Commercial</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, textAlign:'center' }}>L'ensemble de nos conseillers COPEE vous assurent, grâce à leur expertise en énergie, un service de qualité. Il vous propose une étude énergétique personnalisée qui soit adaptée à vos besoins. Intégrité, implication et professionnalisme sont leurs maîtres-mots.</Text>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/comp.png')} 
                        style={{ width: 200, height: 200, borderRadius: 100}} 
                    />
                    <Text style={{ fontSize: 20, fontWeight: '500',  color:'white',fontStyle: 'italic' }}>Le Pôle Informatique et Marketing</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, textAlign:'center' }}>Ce pôle a pour mission de développer toute l'interface numérique de COPEE. Il est nécessaire à toute société qui souhaite véhiculer aux mieux les valeurs de l'entreprise.</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/tourne.png')} 
                        style={{ width: 200, height: 200, borderRadius: 100}} 
                    />
                    <Text style={{ fontSize: 20, fontWeight: '500',  color:'white',fontStyle: 'italic' }}>Service d'Installations</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, textAlign:'center' }}>COPEE assure également la pose ainsi que la mise en service du matériel (panneaux solaires, ballons solaires, domotique... etc).</Text>
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
});

export default NotreEquipe;
