import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, ImageBackground, Alert, StatusBar } from 'react-native';
import { db } from '../../firebase';
import { collection, query, getDocs } from '@firebase/firestore';
import { updateDoc, doc,where } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const MyTestsScreen = () => {
  const [tests, setTests] = useState([]);
  const navigation=useNavigation();
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersQuery = query(usersCollection);
      const usersSnapshot = await getDocs(usersQuery);
  
      const fetchedTests = [];
  
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const userId = userDoc.id;
        const testsCollection = collection(db, 'users', userId, 'Tests');
        const testsQuery = query(testsCollection, where('Status', '==', 'En Attente...'));
        const testsSnapshot = await getDocs(testsQuery);
  
        testsSnapshot.forEach((testDoc) => {
          const testData = testDoc.data();
          fetchedTests.push({ userId, ...userData, testId: testDoc.id, ...testData }); // Corrected property name here
        });
      }
  
      setTests(fetchedTests);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };
  


  const handleAccept = async (test) => {
    if (!test) {
      console.error('Invalid test object:', test);
      return;
    }
  
    const { userId, testId } = test;
  
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir accepter ce test ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: async () => {
            try {
              await updateDoc(doc(db, 'users', userId, 'Tests', testId), {
                Status: 'Accepté'
              });
              fetchTests(); // Optionally, fetch the updated tests after updating the status
            } catch (error) {
              console.error('Error accepting test:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const handleReject = async (test) => {
    if (!test) {
      console.error('Invalid test object:', test);
      return;
    }
  
    const { userId, testId } = test;
  
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir refuser ce test ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: async () => {
            try {
              await updateDoc(doc(db, 'users', userId, 'Tests', testId), {
                Status: 'Refusé'
              });
              fetchTests(); // Optionally, fetch the updated tests after updating the status
            } catch (error) {
              console.error('Error rejecting test:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const retour = () => {
    navigation.navigate('PersonnelDashboard');
  };
  





  return (
    <ImageBackground source={require('../../assets/back3.jpg')} style={styles.background}>
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Liste des Tests</Text>
          </View>
      <ScrollView>
        {tests.map((test, index) => (
            <View key={index} style={styles.userData}>
            <Text style={styles.userDataText}>Nom: {test.Nom}</Text>
            <Text style={styles.userDataText}>Prénom: {test.Prenom}</Text>
            <Text style={styles.userDataText}>Email: {test.Email}</Text>
            <Text style={styles.userDataText}>Adresse: {test.Adresse}</Text>
            <Text style={styles.userDataText}>Téléphone: {test.PhoneNumber}</Text>
            <Text style={styles.userDataText}>Facture Mensuelle: {test.FactureMensuelle}</Text>
            <Text style={styles.userDataText}>Revenu Fiscal: {test.RevenuFiscal}</Text>
            <Text style={styles.userDataText}>Nombre de personnes à charge: {test.NbPersonnes}</Text>
            <Text style={styles.userDataText}>Propriétaire depuis 2 ans: {test.Proprietaire}</Text>
            <Text style={styles.userDataText}>Type d'installation: {test.TypeInstallation}</Text>
            <Text style={styles.userDataText}>Préférence pour être contacté: {test.Contact}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={() => handleAccept(test)}>
            <Text style={styles.buttonText}>Accepter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => handleReject(test)}>
            <Text style={styles.buttonText}>Refuser</Text>
            </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.buttonr} onPress={retour}>
        <Text style={styles.buttonTextr}>Retour</Text>
      </TouchableOpacity>
      </View>
</ImageBackground>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      color: 'white',
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
      color:"white",
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
      color: 'white',
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
      padding: 50,
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
    buttond: {
      backgroundColor: '#65539E',
      paddingVertical: 15,
      borderRadius: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
      },
      button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      buttonr: {
        backgroundColor: '#65539E',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
      },
      buttonTextr: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });
export default MyTestsScreen;
