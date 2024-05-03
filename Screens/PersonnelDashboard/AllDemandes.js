import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, ImageBackground, Alert, StatusBar } from 'react-native';
import { db } from '../../firebase';
import { collection, query, getDocs } from '@firebase/firestore';
import { updateDoc, doc,where } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const AllDemandes = () => {
  const [Demandes, setDemandes] = useState([]);
  const navigation=useNavigation();
  useEffect(() => {
    fetchDemandes();
  }, []);
  const retour = () => {
    navigation.navigate('PersonnelDashboard');
  };

  const fetchDemandes = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersQuery = query(usersCollection);
      const usersSnapshot = await getDocs(usersQuery);
  
      const fetchedDemandes = [];
  
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const userId = userDoc.id;
        const DemandesCollection = collection(db, 'users', userId, 'Demandes');
        const DemandesQuery = query(DemandesCollection, where('Status', '==', 'En cours de traitement...'));
        const DemandesSnapshot = await getDocs(DemandesQuery);
  
        DemandesSnapshot.forEach((DemandeDoc) => {
          const DemandesData = DemandeDoc.data();
          fetchedDemandes.push({ userId, ...userData, DemandeId: DemandeDoc.id, ...DemandesData }); // Corrected property name here
        });
      }
  
      setDemandes(fetchedDemandes);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };
  


  const handleAccept = async (Demande) => {
    if (!Demande) {
      console.error('Invalid test object:', Demande);
      return;
    }
  
    const { userId, DemandeId } = Demande;
  
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de marquer cette demande comme traitée ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: async () => {
            try {
              await updateDoc(doc(db, 'users', userId, 'Demandes', DemandeId), {
                Status: 'Traitée'
              });
              fetchDemandes();
            } catch (error) {
              console.error('Error accepting test:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
 
  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); 
    return date.toLocaleString(); 
  };
  
  





  return (
    <ImageBackground source={require('../../assets/back3.jpg')} style={styles.background}>
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Liste des Demandes</Text>
          </View>
      <ScrollView>
        {Demandes.map((Demandes, index) => (
            <View key={index} style={styles.userData}>
            <Text style={styles.userDataText}>Nom: {Demandes.Nom}</Text>
            <Text style={styles.userDataText}>Prénom: {Demandes.Prenom}</Text>
            <Text style={styles.userDataText}>Email: {Demandes.Email}</Text>
            <Text style={styles.userDataText}>Adresse: {Demandes.Adresse}</Text>
            <Text style={styles.userDataText}>Téléphone: {Demandes.PhoneNumber}</Text>
            <Text style={styles.userDataText}>Type d'installation: {Demandes.TypeInstallation}</Text>
            <Text style={styles.userDataText}>Type d'équipement: {Demandes.typeEquipement}</Text>
            <Text style={styles.userDataText}>Type de maison: {Demandes.typeMaison}</Text>
            <Text style={styles.userDataText}>Hauteur de maison {Demandes.hauteurMaison} Métres</Text>
            <Text style={styles.userDataText}>Date de création {formatDate(Demandes.createdAt)}</Text>
            <Text style={styles.userDataText}>Date de début de travail {formatDate(Demandes.dateDebutTravail)}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={() => handleAccept(Demandes)}>
            <Text style={styles.buttonText}>Marquer comme Traitée</Text>
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
export default AllDemandes;
