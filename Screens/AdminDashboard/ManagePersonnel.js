import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { db} from '../../firebase';
import { collection, getDocs} from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons'; 
import { deleteUser} from "firebase/auth"; 

const ManagePersonnel = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [personnel, setPersonnel] = useState([]);

  const retour = () => {
    navigation.navigate('dashboard');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personnelCollection = await getDocs(collection(db, 'Personnel'));
        const personnelData = personnelCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPersonnel(personnelData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching personnel:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeletePersonnel = async (personnelId) => {
    try {
      // Delete user from Firebase Authentication
      await deleteUser(personnelId);
      Alert.alert('Success', 'User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Liste du personnel</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Form')}>
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {personnel.length > 0 ? (
          personnel.map(person => (
            <View style={styles.personnelData} key={person.id}>
              <View style={styles.personnelDataHeader}>
                <Text style={styles.personnelDataTitle}>Email: {person.Email}</Text>
                <TouchableOpacity onPress={() => handleDeletePersonnel(person.id)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
              <Text style={styles.personnelDataText}>Nom: {person.Nom}</Text>
              <Text style={styles.personnelDataText}>Prénom: {person.Prenom}</Text>
              <Text style={styles.personnelDataText}>Numéro de téléphone: {person.PhoneNumber}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noPersonnelText}>Aucun personnel trouvé.</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={retour}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  personnelData: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  personnelDataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  personnelDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  personnelDataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noPersonnelText: {
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
});

export default ManagePersonnel;
