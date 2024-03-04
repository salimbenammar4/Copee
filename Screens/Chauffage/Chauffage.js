import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../Login/style';

const Chauffage = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../assets/chauff.png')} style={style.background}>
        <>

            <StatusBar backgroundColor="#c9392c" barStyle="light-content" />

            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.openDrawer()}
                >
                    <MaterialCommunityIcons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, lineHeight: 20, marginTop: 10, textAlign: "center", marginBottom: 10, color:'white' }}>Chauffage et eau chaude sanitaire</Text>
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
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>Présentation</Text>
                <Image
                        source={require('../../assets/split.png')}
                        style={{ width: 290, height: 200, borderRadius:20, alignSelf:'center', marginTop:20  }}
                    />
                <Text style={{ fontSize:15, fontWeight:'500', marginTop:18,color:'white', textAlign:'center' }}>PAC AIR/AIR – Climatisation SPLIT</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Se chauffer en hiver</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Se raffraichir en été</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Réaliser des économies d’énergies</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> COP {'>'} 3</Text>
                    <Text style={{ fontSize:15, fontWeight:'500', marginTop:18,color:'white', textAlign:'center' }}>PAC AIR/AIR – Climatisation CONSOLE</Text>
                    <Text style={{ fontSize:15, fontWeight:'500', marginTop:18,color:'white' }}>La console est la solution idéale en rénovation pour le remplacement d’un radiateur électrique ou pour un séjour. La diffusion de l’air chaud offre un confort optimal en dédoublant son flux d’air pour le diffuser simultanément vers le haut et le bas de la pièce. Cette diffusion permet d’avoir une température homogène dans toute la pièce et de garantir un confort idéal. En mode rafraîchissement la console ne soufflera que vers le haut de la pièce. L’air plus frais étant naturellement plus dense que l’air ambiant, il redescendra se mélanger avec l’air ambiant. Cette diffusion de l’air procure un rafraîchissement agréable et performant.</Text>
            </View>


                <View style={styles.hero}>
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>PAC AIR/EAU</Text>
                <Image
                        source={require('../../assets/pacair.png')}
                        style={{ width: 290, height: 200, borderRadius:20, alignSelf:'center', marginTop:20  }}
                    />
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, }}>Réalisez jusqu’à 50% d’économies sur le chauffage en changeant votre ancienne chaudière par une pompe à chaleur AIR/EAU. Profitez de toutes les aides : crédit d’impôt, prime EDF, coup de pouce. En fonction de vos revenus, vous pouvez bénéficier d’une prise en charge importante du coût de l’ensemble des travaux.</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Capter gratuitement la chaleur présente dans l’air extérieur</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Des COP pouvant aller jusqu’à 4 (pour 1 kWh absorbé, votre pompe à chaleur restitue 4 kWh)</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> Elle s’adapte aux principaux systèmes de chauffage existants</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10,}}><FontAwesome name="dot-circle-o" size={15} color="white" /> La pompe à chaleur (PAC) air-eau peut fonctionner, même lorsque les températures extérieures sont faibles : -10° C, -15° C</Text>
                </View>
                <View style={styles.hero}>
                <Text style={{textAlign:'center', fontSize:34,color:'white', fontWeight:'bold',fontStyle: 'italic'}}>Ballon thermodynamique</Text>
<Image
                        source={require('../../assets/ballon.png')}
                        style={{ width: 290, height: 200, borderRadius:20, alignSelf:'center', marginTop:20  }}
                    />
<Text style={{ fontSize: 15, fontWeight: '500',  color:'white', marginTop:10, }}>Réalisez jusqu’à 80% d’économies sur la part d’énergie dédiée à l’eau chaude sanitaire en utilisant des solutions performantes comme le ballon thermodynamique. Bénéficiez de 30% de crédit d’impôt.</Text>
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

export default Chauffage;
