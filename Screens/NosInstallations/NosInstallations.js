import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NosInstallations = () => {
    const navigation=useNavigation();
    return (
        <ImageBackground source={require('../../assets/nosinstallations.jpg')} style={style.background}>
            <>
            
                <View style={style.header}>
                    <TouchableOpacity
                        style={style.menuButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <MaterialCommunityIcons name="menu" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>Nos Installations</Text>
                    </View>
                    <TouchableOpacity
                        style={style.profileButton}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <MaterialCommunityIcons name="account-circle" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={style.container}>
                    <Card style={style.card}>
                        <Card.Cover source={require('../../assets/panneaux-solaires.jpg')} style={style.cardImage} />
                        <Card.Content>
                            <Title style={style.cardTitle}>Panneaux Solaires</Title>
                            <Paragraph style={style.cardText}>COPEE vous propose, lors de votre installation, un KIT SOLAIRE.</Paragraph>
                            <Paragraph style={style.cardText}>Pouvant aller de 1500 Wc (Watt crête) à 25 000 Wc, ce kit comprend la fourniture et pose d'une centrale photovoltaïque, l'installation de Panneaux Photovoltaïques en surimposition, un micro-onduleur pour chaque panneau, un coffret de raccordement électrique ainsi qu'un système de fixation.</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={style.card}>
                        <Card.Cover source={require('../../assets/pompe.jpg')} style={style.cardImage} />
                        <Card.Content>
                            <Title style={style.cardTitle}>Pompe à Chaleurs</Title>
                            <Paragraph style={style.cardText}>Nous installons 2 types de pompe à chaleur (PAC) :</Paragraph>
                            <Paragraph style={style.cardText}><FontAwesome name="dot-circle-o" size={15} color="black" />    La PAC AIR/AIR : Elle agit comme une climatisation réversible et vous permet de réchauffer ou bien de rafraîchir l'air ambient.</Paragraph>
                            <Paragraph style={style.cardText}><FontAwesome name="dot-circle-o" size={15} color="black" />    La PAC AIR/EAU : Elle vous permet également de réchauffer et de rafraîchir votre habitat mais aussi de produire de l’eau chaude.</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={style.card}>
                        <Card.Cover source={require('../../assets/chauffe.jpg')} style={style.cardImage} />
                        <Card.Content>
                            <Title style={style.cardTitle}>Ballons Thermodynamiques</Title>
                            <Paragraph style={style.cardText}>COPEE assure également l'installation de votre Ballon Thermodynamique également appelé chauffe - eau thermodynamique. Le Ballon Thermodynamique fonctionne avec une pompe à chaleur et permet ainsi de réchauffer votre eau chaude !</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={style.card}>
                        <Card.Cover source={require('../../assets/ballon.jpg')} style={style.cardImage} />
                        <Card.Content>
                            <Title style={style.cardTitle}>Ballons Solaires </Title>
                            <Paragraph style={style.cardText}>Le ballon solaire également appelé chauffe-eau solaire permet tout comme le ballon thermodynamique de réchauffer l'eau chaude sanitaire. Cependant, contrairement au ballon thermodynamique, le Ballon Solaire fonctionne lui grâce à des panneaux solaires thermiques.</Paragraph>
                        </Card.Content>
                    </Card>
                    
                </ScrollView>
            </>
        </ImageBackground>
    );
};

const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardImage: {
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 24,
        marginTop: 10
    },
    cardText: {
        marginTop: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
        borderRadius: 20,
        width: '50%',
        alignSelf: 'center',
        backgroundColor: 'blue',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
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
});
export default NosInstallations;
