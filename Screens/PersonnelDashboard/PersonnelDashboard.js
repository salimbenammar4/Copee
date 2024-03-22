import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebase';
import styles from '../Login/style';
const { width } = Dimensions.get('window');

const PersonnelDashboard = () => {
    const navigation = useNavigation();

    const handleManageDiscussions = () => {
        navigation.navigate('ChatScreen');
    };

    const alltests=()=>{
        navigation.navigate('AllTests');
    }

    const handleLogout = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            navigation.navigate('Login'); 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <ImageBackground source={require('../../assets/back4.jpg')} style={localStyles.background}>
            <>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <View contentContainerStyle={localStyles.container}>
                    <View style={styles.hero}>
                        <Image
                            source={{ uri: 'https://www.copee.eu/wp-content/uploads/2022/01/logo-white-02-3.png' }}
                            style={styles.heroimg}
                            resizeMode="contain"
                        />
                    </View>
                    <TouchableOpacity style={localStyles.button} onPress={handleManageDiscussions}>
                        <Text style={localStyles.buttonText}>Gérer les discussions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={localStyles.button} onPress={alltests}>
                        <Text style={localStyles.buttonText}>Gérer les tests d'éligibilité</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={localStyles.button} onPress={handleLogout}>
                        <Text style={localStyles.buttonText}>Gérer les demandes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[localStyles.logoutbutton,{marginTop:270}]} onPress={handleLogout}>
                        <Text style={localStyles.buttonText}>Se Déconnecter</Text>
                    </TouchableOpacity>
                </View>
            </>
        </ImageBackground>
    );
};

const localStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight || 0,
        marginTop: 50,
    },
    button: {
        backgroundColor: '#56409e',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 20,
        borderRadius: 10,
       width:300,
       alignSelf:'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    logoutbutton: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 20,
        borderRadius: 10,
        width:300,
       alignSelf:'center'
    },
});

export default PersonnelDashboard;
