import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { collection, query, getDocs } from '@firebase/firestore';
import { db } from '../../firebase';

const Avis = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchAvis();
  }, []);

  const fetchAvis = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersQuery = query(usersCollection);
      const usersSnapshot = await getDocs(usersQuery);

      const fetchedUserData = [];

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const userId = userDoc.id;
        const demandesCollection = collection(db, 'users', userId, 'Demandes');
        const demandesQuery = query(demandesCollection);
        const demandesSnapshot = await getDocs(demandesQuery);

        const feedbacks = [];

        demandesSnapshot.forEach((demandeDoc) => {
          const demandeData = demandeDoc.data();
          if (demandeData.feedbacks) { // Corrected property name here
            const demandeFeedbacks = demandeData.feedbacks; // Corrected property name here
            demandeFeedbacks.forEach((feedback) => {
              feedbacks.push({ demandeId: demandeDoc.id, userId, ...feedback });
            });
          }
        });

        fetchedUserData.push({ userId, ...userData, feedbacks });
      }

      setUserData(fetchedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <ImageBackground source={require('../../assets/back3.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Liste des Demandes</Text>
        </View>
        <ScrollView>
          {userData.map((userData, index) => (
            <View key={index} style={styles.userData}>
              <Text style={styles.userDataText}>Nom: {userData.Nom}</Text>
              <Text style={styles.userDataText}>Prénom: {userData.Prenom}</Text>
              <Text style={styles.userDataText}>Email: {userData.Email}</Text>
              <Text style={styles.userDataText}>Adresse: {userData.Adresse}</Text>
              <Text style={styles.userDataText}>Téléphone: {userData.PhoneNumber}</Text>
              {userData.feedbacks.map((feedback, index) => (
                <View key={index} style={styles.feedbackContainer}>
                  <Text style={styles.userDataText}>Demande ID: {feedback.demandeId}</Text>
                  <Text style={styles.userDataText}>Rating: {feedback.rating}</Text>
                  <Text style={styles.userDataText}>Feedback: {feedback.feedback}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
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
  userData: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  userDataText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  feedbackContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});

export default Avis;
