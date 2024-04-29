import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, ImageBackground, Alert, StatusBar } from 'react-native';
import { db } from '../../firebase';
import { collection, query, getDocs, deleteDoc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { doc } from '@firebase/firestore';

const MyTests = () => {

  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const auth = getAuth();
  const [selected, setSelected] = useState(false);
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
    } catch (error) {
      console.error('Error fetching tests:', error);
      Alert.alert('Error', 'An error occurred while fetching tests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchTests, 1000); 
    return () => clearInterval(intervalId);
  }, []);

const gotoDemandePanneaux=()=>{
  navigation.navigate("demandepanneaux");
}
const gotoDemandePompe=()=>{
  navigation.navigate("demandepompe");
}
const gotoDemandeBallon=()=>{
  navigation.navigate("demandeballon");
}
const gotoDemandeThermo=()=>{
  navigation.navigate("thermo");
}

  const retour = () => {
    navigation.navigate("MainHomeScreen");
  };
  const handleRadioButtonClick = () => {
    setSelected(!selected);
  };

  const gototest = () => {
    navigation.navigate("test");
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'En Attente...':
        return 'yellow';
      case 'Accepté':
        return '#90EE90';
      case 'Refusé':
        return 'red';
      default:
        return 'white';
    }
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
      <ImageBackground source={require('../../assets/back3.jpg')} style={styles.background}>
        <>
        <StatusBar barStyle="light-content" />
      <View style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',}}>
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
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.userDataText}>Facture Mensuelle: {test.FactureMensuelle}</Text>
      <Text style={styles.userDataText}>Revenu Fiscal: {test.RevenuFiscal}</Text>
      <Text style={styles.userDataText}>Nombre de personnes à charge: {test.NbPersonnes}</Text>
      <Text style={styles.userDataText}>Proprietaire depuis 2 ans: {test.Proprietaire}</Text>
      <Text style={styles.userDataText}>Type d'installation: {test.TypeInstallation}</Text>
      <Text style={styles.userDataText}>Préférence pour étre contacté: {test.Contact}</Text>
      <Text style={[styles.userDataText, { color: getStatusColor(test.Status) }]}>Status: {test.Status}</Text>
      {test.Status === 'Accepté' && test.TypeInstallation==='Panneaux Solaires' && (
        <TouchableOpacity style={styles.buttond} onPress={gotoDemandePanneaux}>
          <Text style={styles.buttonText}>Diriger vers la demande</Text>
        </TouchableOpacity>
      )}
       {test.Status === 'Accepté' && test.TypeInstallation==='Pompe à Chaleur' && (
        <TouchableOpacity style={styles.buttond} onPress={gotoDemandePompe}>
          <Text style={styles.buttonText}>Diriger vers la demande</Text>
        </TouchableOpacity>
      )}
      {test.Status === 'Accepté' && test.TypeInstallation==='Ballons Thermodynamiques' && (
        <TouchableOpacity style={styles.buttond} onPress={gotoDemandeThermo}>
          <Text style={styles.buttonText}>Diriger vers la demande</Text>
        </TouchableOpacity>
      )}
      {test.Status === 'Accepté' && test.TypeInstallation==='Ballons Solaires' && (
        <TouchableOpacity style={styles.buttond} onPress={gotoDemandeBallon}>
          <Text style={styles.buttonText}>Diriger vers la demande</Text>
        </TouchableOpacity>
      )}
      {test.Status==='Refusé' && test.TypeInstallation==='Panneaux Solaires' &&(
        <View  style={styles.warning}>
        <Ionicons name="warning" size={40} color="yellow" /> 
        <Text style={{fontSize:25,color:'white'}}>Attention!</Text>
        <Text style={{color: 'white', fontSize:15, marginTop:15}}>Se voir refuser l'installation de nouveaux panneaux solaires ne signifie pas que vous ne pouvez pas les installer. Mais vous pourriez être confronté à certains problèmes tels qu’un dysfonctionnement du produit. Si vous insistez pour les installer, vous devez convenir que dans ce cas, COPEE n'est pas responsable du dysfonctionnement des produits.</Text>
        <TouchableOpacity onPress={handleRadioButtonClick} style={styles.radioButton}>
        <View style={[styles.radioCircle, { backgroundColor: selected ? '#009000' : '#ffffff' }]} />
        <Text style={styles.radioText}>Accepter les conditions</Text>
      </TouchableOpacity>
        <TouchableOpacity style={[styles.buttondd, { opacity: selected ? 1 : 0.5 }]} disabled={!selected}  onPress={gotoDemandePanneaux}>
          <Text style={styles.buttonText}>Diriger vers la demande</Text>
        </TouchableOpacity>
        </View>
      )}
    </View>
  ))
) : (
  <View style={styles.noTestsContainer}>
    <Text style={styles.noTestsText}>Vous n'avez pas de tests enregistrés.</Text>
    <Text style={[styles.noTestsText, { marginTop: 50 }]}>Vous pouvez demander un test pour profiter de nos installations!</Text>
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
    marginTop:120
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
      width:300,
      marginTop:10
      },
    warning:{
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
});


export default MyTests;
