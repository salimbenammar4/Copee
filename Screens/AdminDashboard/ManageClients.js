import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import { db, FIREBASE_AUTH } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons'; 
import { getAuth } from "firebase/auth";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth"; 

const ManageClients = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const retour = () => {
    navigation.navigate('dashboard');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'users'));
        const usersData = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      console.log('Deleting user:', userId);
      await deleteDoc(doc(db, 'users', userId));
      Alert.alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', error.message);
    }
  };
  if (loading) {
    return (
      <ImageBackground source={require('../../assets/cl.jpg')} style={styles.background}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../../assets/cl.jpg')} style={styles.background}>
      <>
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Liste des Clients</Text>
        </View>
        {users.length > 0 ? (
          users.map(user => (
            <View style={styles.userData} key={user.id}>
              <View style={styles.userDataHeader}>
                <Text style={styles.userDataTitle}>Email: {user.Email}</Text>
                <TouchableOpacity onPress={() => handleDeleteUser(user.id)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <Text style={styles.userDataText}>Nom: {user.Nom}</Text>
              <Text style={styles.userDataText}>Prénom: {user.Prenom}</Text>
              <Text style={styles.userDataText}>Adresse: {user.Adresse}</Text>
              <Text style={styles.userDataText}>Numéro de téléphone: {user.PhoneNumber}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noUsersText}>No users found.</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={retour}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
    </>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#65539E',
    padding: 10,
    borderRadius: 20,
  },
  userData: {
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  userDataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noUsersText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#65539E',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default ManageClients;
