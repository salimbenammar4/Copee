import React from 'react';
import { View, StatusBar, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../Login/style';

const { width } = Dimensions.get('window');

const Chauffage = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../assets/backkk.jpg')} style={style.background}>
            <>
                <StatusBar  barStyle="light-content" />
                <View style={style.header}>
                    <TouchableOpacity
                        style={style.menuButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <MaterialCommunityIcons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>Chauffage et eau chaude sanitaire</Text>
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
                        <Text style={style.heroTitle}>Présentation</Text>
                        <Image
                            source={require('../../assets/split.jpg')}
                            style={style.image} 
                        />
                        <Text style={style.description}>
                            PAC AIR/AIR – Climatisation SPLIT
                        </Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Se chauffer en hiver</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Se raffraichir en été</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Réaliser des économies d’énergies</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> COP {'>'} 3</Text>
                        <Text style={style.description}>PAC AIR/AIR – Climatisation CONSOLE</Text>
                        <Text style={style.description}>
                            La console est la solution idéale en rénovation pour le remplacement d’un radiateur électrique ou pour un séjour...
                        </Text>
                    </View>
                    <View style={styles.hero}>
                        <Text style={style.heroTitle}>PAC AIR/EAU</Text>
                        <Image
                            source={require('../../assets/pacair.png')}
                            style={style.image} 
                        />
                        <Text style={style.description}>
                            Réalisez jusqu’à 50% d’économies sur le chauffage en changeant votre ancienne chaudière par une pompe à chaleur AIR/EAU...
                        </Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Capter gratuitement la chaleur présente dans l’air extérieur</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Des COP pouvant aller jusqu’à 4 (pour 1 kWh absorbé, votre pompe à chaleur restitue 4 kWh)</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> Elle s’adapte aux principaux systèmes de chauffage existants</Text>
                        <Text style={style.listItem}><FontAwesome name="dot-circle-o" size={15} color="white" /> La pompe à chaleur (PAC) air-eau peut fonctionner, même lorsque les températures extérieures sont faibles : -10° C, -15° C</Text>
                    </View>
                    <View style={styles.hero}>
                        <Text style={style.heroTitle}>Ballon thermodynamique</Text>
                        <Image
                            source={require('../../assets/ballon.png')}
                            style={style.image} 
                        />
                        <Text style={style.description}>
                            Réalisez jusqu’à 80% d’économies sur la part d’énergie dédiée à l’eau chaude sanitaire en utilisant des solutions performantes...
                        </Text>
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
});

export default Chauffage;
