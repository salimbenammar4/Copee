import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/style';

const { width } = Dimensions.get('window');

const Photovoltaic = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../assets/photo.png')} style={style.background}>
            <>
                <StatusBar barStyle="light-content" />
                <View style={style.header}>
                    <TouchableOpacity
                        style={style.menuButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <MaterialCommunityIcons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>Photovoltaïque</Text>
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
                        <Text style={style.heroTitle}>L'énergie photovoltaïque</Text>
                        <Image
                            source={require('../../assets/photo2.png')} 
                            style={style.image} 
                        />
                        <Text style={style.description}>
                            L’énergie solaire photovoltaïque est une énergie électrique produite à partir du rayonnement solaire grâce à des panneaux...
                        </Text>
                    </View>
                    <View style={styles.hero}>
                        <Text style={style.heroTitle}>Les avantages de l'énergie photovoltaïque</Text>
                        <Image
                            source={require('../../assets/photo 3.png')} 
                            style={style.image} 
                        />
                        <Text style={style.description}>De plus les accords de Kyoto :</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Réduire les émissions de gaz à effet de serre de 40% d’ici 2030</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Diminuer de 30% notre consommation d’énergies fossiles en 2030</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Ramener la part du nucléaire à 50% de la production en 2025</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Porter en 2030 la part des énergies renouvelables à 32% de notre consommation</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Diviser par deux notre consommation finale d’énergie d’ici 2050</Text>
                    </View>
                    <View style={styles.hero}>
                        <Text style={style.heroTitle}>Nous proposons des kits de 1500 Wc à 25000 Wc</Text>
                        <Image
                            source={require('../../assets/pann.png')} 
                            style={style.image} 
                        />
                        <Text style={style.description}>Chaque kit comprend :</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Fourniture et pose d’une centrale PV en surimposition</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Panneau photovoltaïque 375 WC en surimposition toiture</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Un Micro onduleur par panneaux pour raccordement direct</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Un coffret de raccordement AC (Origine France)</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Un système de fixation</Text>                
                    </View>
                    <View style={styles.hero}>
                        <Text style={style.heroTitle}>Des panneaux solaires vous intéressent?</Text>
                        <Text style={style.description}>
                            Si vous souhaitez nous contacter pour avoir des informations sur ce produit, veuillez remplir le formulaire ci-dessous. Nous vous recontacterons dans les plus brefs délais.
                        </Text>
                        <TouchableOpacity style={style.button} onPress={() => navigation.navigate("MyTests")}>
                            <Text style={style.buttonText}>Tester l'éligibilité</Text>
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
        marginTop: Platform.OS === 'ios' ? 40 : 10,
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
        fontSize: 20,
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
    image: {
        width: width * 0.8,
        height: 200,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    description: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 18,
        color: 'white',
        textAlign: 'center',
    },
    listItem: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        marginTop: 10,
        marginLeft: 20, // Add left margin for bullet points
    },
    button: {
        marginTop: 15,
        backgroundColor: '#FF4433',
        paddingVertical: 12,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        alignSelf: 'center', // Align button to center
        width:300
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
    },
});

export default Photovoltaic;
