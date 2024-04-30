import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, ImageBackground, Alert, StatusBar, Modal, TextInput } from 'react-native';
import { db } from '../../firebase';
import { collection, query, getDocs, deleteDoc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, setDoc, addDoc } from '@firebase/firestore';
import StarRating from 'react-native-star-rating';

const MyDemandes = () => {

  const [loading, setLoading] = useState(true);
  const [Demande, setDemande] = useState([]);
  const [feedbackGiven, setFeedbackGiven] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [DemandeFeedbackId, setDemandeFeedbackId]=useState();

  const fetchDemandes = async () => {
    try {
      const demandesCollection = collection(db, 'users', user.uid, 'Demandes');
      const q = query(demandesCollection);
      const querySnapshot = await getDocs(q);
      const fetchedDemandes = [];
      querySnapshot.forEach((doc) => {
        fetchedDemandes.push({ id: doc.id, ...doc.data() });
      });
      setDemande(fetchedDemandes);
    } catch (error) {
      console.error('Error fetching tests:', error);
      Alert.alert('Erreur', 'Veuillez vérifier votre connexion internet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchDemandes, 1000); 
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); 
    return date.toLocaleString(); 
  };

  const retour = () => {
    navigation.navigate("MainHomeScreen");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours de traitement...':
        return 'yellow';
      case 'Traitée':
        return '#90EE90';
      default:
        return 'white';
    }
  };

  const deleteDemande = async (id) => {
    console.log('Deleting test with id:', id);
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'Demandes', id));
      fetchDemandes();
      Alert.alert(
        'Suppression réussie',
        'La demande est supprimée avec succès',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  const submitFeedback = async (demandeId) => {
    try {
      await addDoc(collection(db, "users", user.uid,"Demandes",demandeId,"Feedbacks"), {
        userId: user.uid,
        feedback: feedback,
        rating: rating,
      });
      setFeedback('');
      setRating(0);
      setModalVisible(false);
      setFeedbackGiven([...feedbackGiven, demandeId]); 
      Alert.alert('Nous vous remercions pour votre feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    }
  };

  const isFeedbackGiven = (demandId) => {
    return feedbackGiven.includes(demandId); 
  };

  if (loading) {
    return (
      <ImageBackground source={require('../../assets/back3.jpg')} style={styles.background}>
        <>
          <StatusBar barStyle="light-content" />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../../assets/back3.jpg')} style={styles.background}>
      <>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Mes Demandes</Text>
          </View>
          <ScrollView>
            {Demande.length > 0 ? (
              Demande.map((demande, index) => (
                <View key={index} style={styles.userData}>
                  <TouchableOpacity style={styles.trashIconContainer} onPress={() => deleteDemande(demande.id)}>
                    <MaterialIcons name="delete" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.userDataText}>Type d'Installation: {demande.TypeInstallation}</Text>
                  <Text style={styles.userDataText}>Type d'équipement: {demande.typePanneaux}</Text>
                  <Text style={styles.userDataText}>Type de maison: {demande.typeMaison}</Text>
                  <Text style={styles.userDataText}>Hauteur de maison: {demande.hauteurMaison} Métres</Text>
                  <Text style={styles.userDataText}>Date de création: {formatDate(demande.createdAt)}</Text>
                  <Text style={styles.userDataText}>Date de début de travail: {formatDate(demande.dateDebutTravail)}</Text>
                  <Text style={[styles.userDataText, { color: getStatusColor(demande.Status) }]}>Status: {demande.Status}</Text>
                  {demande.Status === 'Traitée' && (
                    <TouchableOpacity style={[styles.buttond, isFeedbackGiven(demande.id) && styles.buttonDisabled]} onPress={() => {setModalVisible(true); setDemandeFeedbackId(demande.id)}}>
                      <Text style={styles.buttonText}>Donnez votre avis!</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.noTestsContainer}>
                <Text style={styles.noTestsText}>Vous n'avez pas de demandes enregistrées.</Text>
                <Text style={[styles.noTestsText, { marginTop: 50 }]}>Après avoir un test accepté, vous pouvez rédiger une demande d'installation d'équipement.</Text>
              </View>
            )}
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={retour}>
            <Text style={styles.buttonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Donnez votre avis</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={(rating) => setRating(rating)}
              fullStarColor="#FFD700"
              starSize={40}
              containerStyle={{ marginVertical: 10 }}
            />
            <TextInput
              style={styles.input}
              onChangeText={setFeedback}
              value={feedback}
              placeholder="Entrez votre avis ici..."
              multiline
            />
            <TouchableOpacity style={styles.buttondd} onPress={() => submitFeedback(DemandeFeedbackId)}>
              <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttondd} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  noTestsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120
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
  buttondd: {
    backgroundColor: '#65539E',
    paddingVertical: 15,
    borderRadius: 10,
    width: 300,
    marginTop: 10
  },
  warning: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#65539E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
});

export default MyDemandes;
