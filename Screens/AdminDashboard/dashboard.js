import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Platform, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { db } from '../../firebase';
import styles from '../Login/style';
import { getDocs } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../../firebase';
import { signOut } from 'firebase/auth';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const [userCount, setUserCount] = useState(0);
  const [personnelCount, setPersonnelCount] = useState(0);
  const [adminsCount, setAdminsCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'users'));
        const count = usersCollection.size;
        setUserCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    const fetchPersonnelCount = async () => {
      try {
        const personnelCollection = await getDocs(collection(db, 'Personnel'));
        const count = personnelCollection.size;
        setPersonnelCount(count);
      } catch (error) {
        console.error('Error fetching personnel count:', error);
      }
    };

    const fetchAdminsCount = async () => {
      try {
        const adminsCollection = await getDocs(collection(db, 'Admins'));
        const count = adminsCollection.size;
        setAdminsCount(count);
      } catch (error) {
        console.error('Error fetching admins count:', error);
      }
    };

    fetchUserCount(); 
    fetchPersonnelCount(); 
    fetchAdminsCount(); 
  }, []);


  const handleManageDiscussions = () => {
    navigation.navigate('ChatScreen');
  };

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ImageBackground source={require('../../assets/admin12.jpg')} style={style.background}>
      <>
    <ScrollView style={style.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://www.copee.eu/wp-content/uploads/2022/01/logo-white-02-3.png' }}
          style={styles.heroimg}
          resizeMode="contain"
        />
      </View>
      <View style={style.cardContainer}>
        <TouchableOpacity style={style.card} onPress={() => navigation.navigate('Clients')}>
          <View style={style.cardHeader}>
            <Text style={style.cardText}>Clients :        <Text>{userCount}</Text></Text>
            <AntDesign name="user" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.card} onPress={() => navigation.navigate('Personnel')}>
          <View style={style.cardHeader}>
            <Text style={style.cardText}>Personnels : <Text>{personnelCount}</Text></Text>
            <AntDesign name="tool" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.card} onPress={() => navigation.navigate('ManageUsers')}>
          <View style={style.cardHeader}>
            <Text style={style.cardText}>Admins :       <Text>{adminsCount}</Text></Text>
            <MaterialIcons name="admin-panel-settings" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.container}>
        <TouchableOpacity style={style.button} onPress={handleManageDiscussions}>
          <Text style={style.buttonText}>Gérer les discussions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.button} onPress={handleLogout}>
          <Text style={style.buttonText}>Se Déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  button: {
    backgroundColor: '#56409e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Dashboard;
