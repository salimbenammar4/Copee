import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground,TouchableOpacity } from 'react-native';
import { collection, query, getDocs } from '@firebase/firestore';
import { db } from '../../firebase';
import StarRating from './StarRating';
import { useNavigation } from '@react-navigation/native';
const Avis = () => {
  const [userData, setUserData] = useState([]);
  const navigation=useNavigation();
  useEffect(() => {
    fetchAvis();
  }, []);

  const retour = () => {
    navigation.navigate('PersonnelDashboard');
  };

  const fetchAvis = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersQuery = query(usersCollection);
      const usersSnapshot = await getDocs(usersQuery);

      const allUserData = [];

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const userId = userDoc.id;
        const demandesCollection = collection(db, 'users', userId, 'Demandes');
        const demandesSnapshot = await getDocs(demandesCollection);

        for (const demandeDoc of demandesSnapshot.docs) {
          const demandeId = demandeDoc.id;
          const demandeData = demandeDoc.data();
          const feedbacksCollection = collection(db, 'users', userId, 'Demandes', demandeId, 'Feedbacks');
          const feedbacksSnapshot = await getDocs(feedbacksCollection);

          const userFeedbacks = feedbacksSnapshot.docs.map(feedbackDoc => {
            const feedbackData = feedbackDoc.data();
            return { demandeId, ...feedbackData };
          });

          allUserData.push({ userId, ...userData, ...demandeData, feedbacks: userFeedbacks });
        }
      }

      setUserData(allUserData);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <ImageBackground source={require('../../assets/back3.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Liste d'Avis</Text>
        </View>
        <ScrollView>
          {userData.map((userData, index) => (
            <View key={index} style={styles.userData}>
              <Text style={styles.userDataText}>Nom: {userData.Nom}</Text>
              <Text style={styles.userDataText}>Prénom: {userData.Prenom}</Text>
              <Text style={styles.userDataText}>Email: {userData.Email}</Text>
              <Text style={styles.userDataText}>Adresse: {userData.Adresse}</Text>
              <Text style={styles.userDataText}>Téléphone: {userData.PhoneNumber}</Text>
              <Text style={styles.userDataText}>Type d'installation: {userData.TypeInstallation}</Text>
              <Text style={styles.userDataText}>Type d'équipement: {userData.typeEquipement}</Text>
              {userData.feedbacks.map((feedback, index) => (
                <View key={index} style={styles.feedbackContainer}>
                <Text style={styles.userDataText}>Feedback: {feedback.feedback}</Text>
                <StarRating rating={feedback.rating} />
              </View>
              ))}
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
    
    borderRadius: 10,
    
    marginTop: 2,
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

export default Avis;
