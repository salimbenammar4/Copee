import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/style';

const { width } = Dimensions.get('window');

const NotreEquipe = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../assets/back6.jpg')} style={style.background}>
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
                        <Text style={style.title}>Notre Équipe</Text>
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
                        <Text style={style.heroTitle}>Une organisation divisée en 5 pôles!</Text>
                        <Text style={style.heroDescription}>Nous souhaitons vous proposer un service clé en main. C'est pourquoi nous avons organisé notre structure selon 5 pôles afin de remplir au mieux notre mission !</Text>
                    </View>

                    <View style={styles.section}>
                        <Image
                            source={require('../../assets/admin-picto.png')}
                            style={style.image}
                        />
                        <Text style={style.sectionTitle}>Le Pôle Administratif</Text>
                        <Text style={style.sectionDescription}>Il est au centre de la gestion de la société COPEE. Acteur dans l'ombre, il assure votre accompagnement et la réussite de votre projet grâce aux aides gouvernementales.</Text>
                    </View>
                    <View style={styles.section}>
                        <Image
                            source={require('../../assets/rouages-picto-1.png')}
                            style={style.image}
                        />
                        <Text style={style.sectionTitle}>Le Pôle Technique</Text>
                        <Text style={style.sectionDescription}>Il est le garant du bon déroulé de tous vos projets de rénovation énergétique. Il valide la faisabilité du projet par le biais d'une visite technique. Il s'occupe également de la gestion des commandes ainsi que de la préparation du matériel.</Text>
                    </View>
                    <View style={styles.section}>
                        <Image
                            source={require('../../assets/shake.png')}
                            style={style.image}
                        />
                        <Text style={style.sectionTitle}>Le Pôle Commercial</Text>
                        <Text style={style.sectionDescription}>L'ensemble de nos conseillers COPEE vous assurent, grâce à leur expertise en énergie, un service de qualité. Il vous propose une étude énergétique personnalisée qui soit adaptée à vos besoins. Intégrité, implication et professionnalisme sont leurs maîtres-mots.</Text>
                    </View>
                    <View style={styles.section}>
                        <Image
                            source={require('../../assets/comp.png')}
                            style={style.image}
                        />
                        <Text style={style.sectionTitle}>Le Pôle Informatique et Marketing</Text>
                        <Text style={style.sectionDescription}>Ce pôle a pour mission de développer toute l'interface numérique de COPEE. Il est nécessaire à toute société qui souhaite véhiculer aux mieux les valeurs de l'entreprise.</Text>
                    </View>
                    <View style={styles.section}>
                        <Image
                            source={require('../../assets/tourne.png')}
                            style={style.image}
                        />
                        <Text style={style.sectionTitle}>Service d'Installations</Text>
                        <Text style={style.sectionDescription}>COPEE assure également la pose ainsi que la mise en service du matériel (panneaux solaires, ballons solaires, domotique... etc).</Text>
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
        marginTop: 20,
    },
    heroDescription: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        marginTop: 18,
        marginBottom: 20,
    },
    section: {
        alignItems: 'center',
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        fontStyle: 'italic',
        marginTop: 20,
        textAlign: 'center',
    },
    sectionDescription: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: width * 0.7,
        height: 200,
        borderRadius: 100,
        marginBottom: 10,
        alignSelf:'center'
    },
});

export default NotreEquipe;
