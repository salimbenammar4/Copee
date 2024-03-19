import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { db } from '../../firebase';
import { collection, query, getDocs, deleteDoc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { doc } from '@firebase/firestore';

const MyTests = () => {

  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();


  const fetchTests = async () => {
    try {
      const testsCollection = collection(db, 'users', user.uid, 'Tests');
      const q = query(testsCollection);
      const querySnapshot = await getDocs(q);
      const fetchedTests = [];
      querySnapshot.forEach((doc) => {
        fetchedTests.push({ id: doc.id, ...doc.data() });
      });
      setTests(fetchedTests);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tests: ', error);
    }
  };


  useEffect(() => {
    fetchTests();
  }, []);


  const retour = () => {
    navigation.navigate("MainHomeScreen");
  };


  const gototest = () => {
    navigation.navigate("test");
  };


  const deleteTest = async (id) => {
    console.log('Deleting test with id:', id);
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'Tests', id));
      fetchTests();
      Alert.alert(
        'Suppression réussie',
        'La demande de test est supprimée avec succès',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../../assets/back3.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Liste des Tests</Text>
          <TouchableOpacity style={styles.addButton} onPress={gototest}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {tests.length > 0 ? (
            tests.map((test, index) => (
              <View key={index} style={styles.userData}>
                <TouchableOpacity style={styles.trashIconContainer} onPress={() => deleteTest(test.id)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
                <Text style={styles.userDataText}>Facture Mensuelle: {test.FactureMensuelle}</Text>
                <Text style={styles.userDataText}>Revenu Fiscal: {test.RevenuFiscal}</Text>
                <Text style={styles.userDataText}>Nb Personnes: {test.NbPersonnes}</Text>
                <Text style={styles.userDataText}>Proprietaire: {test.Proprietaire}</Text>
                <Text style={styles.userDataText}>Type Installation: {test.TypeInstallation}</Text>
                <Text style={styles.userDataText}>Contact: {test.Contact}</Text>
                <Text style={styles.userDataText}>Status: {test.Status}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noTestsContainer}>
              <View style={styles.hero}>
                <Image source={require('../../assets/COPEE.png')} style={styles.heroimg} resizeMode="contain" />
              </View>
              <Text style={styles.noTestsText}>Vous n'avez pas de tests enregistrés.</Text>
              <Text style={[styles.noTestsText, { marginTop: 60 }]}>Vous pouvez demander un test pour profiter de nos installations!</Text>
              <TouchableOpacity style={styles.testbutton} onPress={gototest}>
                <Text style={styles.testbuttontext}>Demander un test d'éligibilité</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={retour}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
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
    padding: 17,
    borderRadius: 20,
    width: 50
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userData: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noTestsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTestsText: {
    fontSize: 21,
    color: 'black',
    textAlign: 'center',
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
  hero: {
    backgroundColor: "dBdffe",
    padding: 16,
    borderRadius: 16,
    margin: 5,
  },
  heroimg: {
    width: '100%',
    height: 150,
  },
  testbutton: {
    backgroundColor: '#FF4433',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 30,
    alignItems: 'center',
    width: 300
  },
  testbuttontext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  trashIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default MyTests;
