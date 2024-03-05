import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/style';

const { width } = Dimensions.get('window');

const Domotique = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../assets/domo.png')} style={style.background}>
            <>
                <StatusBar backgroundColor="#8c919a" barStyle="light-content" />
                <View style={style.header}>
                    <TouchableOpacity
                        style={style.menuButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <MaterialCommunityIcons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>Domotique pour photovoltaïque</Text>
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
                        <Text style={style.heroTitle}>La domotique couplée au photovoltaïque permet d’avoir un visuel sur:</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> l’énergie générée en temps réel</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> l’énergie retirée ou injectée au réseau en temps réel</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> l’énergie consommée en temps réel</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> l’énergie disponible pour l’autoconsommation en temps réel</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> des Notifications d’alarme</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> le tout piloté par une application gratuite et sans abonnement pour iOs et Android</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Indépendant de l’onduleur et des compteurs</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Jusqu’à 20 ans de stockage de données</Text>
                    </View>

                    <View style={styles.hero}>
                        <Text style={style.heroTitle}>L’autoconsommation simplifiée.</Text>
                        <Image
                            source={require('../../assets/domop.jpg')}
                            style={style.image}
                        />
                        <Text style={style.description}>Elios4you est un moyen innovant pour optimiser l’autoconsommation et suivre votre installation PV via une application intelligente, développée par 4-noks. Les données, en direct, sont disponibles sur n’importe quel smartphone ou tablette et accessibles n’importe où, n’importe quand. Elios4you mesure très précisément l’énergie générée, consommée, et échangée avec le réseau, la consommation globale de la maison ainsi que le niveau d’autoconsommation atteint.</Text>
                        <Image
                            source={require('../../assets/Domotique-1.png')}
                            style={style.image}
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
        fontSize: 15,
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
    listItem: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        marginTop: 10,
        marginLeft: 20, // Add left margin for bullet points
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
});

export default Domotique;
