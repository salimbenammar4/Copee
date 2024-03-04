import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../Login/style';

const Photovoltaïque = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../assets/photo.png')} style={style.background}>
        <>
            
            <StatusBar backgroundColor="#7f50f2" barStyle="light-content" />
            
            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.openDrawer()}
                >
                    <MaterialCommunityIcons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, lineHeight: 20, marginTop: 10, textAlign: "center", marginBottom: 10, color:'white' }}>Photovoltaïque</Text>
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
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>L'énergie photovoltaïque</Text>
                <Image
                        source={require('../../assets/photo2.png')} 
                        style={{ width: 290, height: 200, borderRadius:20, alignSelf:'center', marginTop:20  }} 
                    />
                <Text style={{ fontSize:15, fontWeight:'500', marginTop:18,color:'white' }}>L’énergie solaire photovoltaïque est une énergie électrique produite à partir du rayonnement solaire grâce à des panneaux. Elle est dite renouvelable, car sa source (le Soleil) est considérée comme inépuisable à l’échelle du temps humain. En fin de vie, le panneau photovoltaïque aura produit 20 à 40 fois l’énergie nécessaire à sa fabrication et à son recyclage.</Text>
            </View>

            
                <View style={styles.hero}>
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>Les avantages de l'énergie photovoltaïque</Text>
                <Image
                        source={require('../../assets/photo 3.png')} 
                        style={{ width: 290, height: 200, borderRadius:20, alignSelf:'center', marginTop:20  }} 
                    />                    
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, }}>De plus les accords de Kyoto :</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Réduire les émissions de gaz à effet de serre de 40% d’ici 2030</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Diminuer de 30% notre consommation d’énergies fossiles en 2030</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Ramener la part du nucléaire à 50% de la production en 2025</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Porter en 2030 la part des énergies renouvelables à 32% de notre consommation</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Diviser par deux notre consommation finale d’énergie d’ici 2050
</Text>

                </View>
                <View style={styles.hero}>
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>Nous proposons des kits de 1500 Wc
à 25000 Wc</Text>
<Image
                        source={require('../../assets/pann.png')} 
                        style={{ width: 290, height: 200, borderRadius:20, alignSelf:'center', marginTop:20  }} 
                    />   
<Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, }}>Chaque kit comprend :</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Fourniture et pose d’une centrale PV en surimposition</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Panneau photovoltaïque 375 WC en surimposition toiture</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Un Micro onduleur par panneaux pour raccordement direct</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Un coffret de raccordement AC (Origine France)</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Un système de fixation
</Text>                
</View>
                <View style={styles.hero}>
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>Des panneaux solaires vous intéressent?</Text>
                <Text style={{ fontSize:15, fontWeight:'500', marginTop:18,color:'white', textAlign:'center' }}>Si vous souhaitez nous contacter pour avoir des informations sur ce produit, veuillez remplir le formulaire ci-dessous. Nous vous recontacterons dans les plus brefs délais.</Text>
                <TouchableOpacity style={style.btn}>
                <Text style={style.btnText}>Tester l'éligibilité</Text>
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

export default Photovoltaïque;
