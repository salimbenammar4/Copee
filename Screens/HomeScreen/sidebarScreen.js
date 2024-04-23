import React from 'react';
import { View, Text, TouchableOpacity, Image,Linking} from 'react-native';
import { MaterialIcons, AntDesign, Fontisto, Entypo, Ionicons,FontAwesome6,MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
const SidebarScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [showServicesSubMenu, setShowServicesSubMenu] = useState(false);
  const navigation=useNavigation()
  const handleMenuItemPress = (menuItem) => {
    console.log('Pressed:', menuItem);
  };
  const handleServicesPress = () => {
    setShowServicesSubMenu(!showServicesSubMenu);
  };

  const openLinkFacebook = () => {
    Linking.openURL('https://www.facebook.com/comptoir.occitan.copee');
};

const openLinkX = () => {
  Linking.openURL('https://twitter.com/Copee26029778');
};

const openLinkLinkedin = () => {
  Linking.openURL('https://www.linkedin.com/company/82936039/admin/');
};
const handleLogout = async () => {
  try {
      await signOut(auth);
      navigation.navigate('Login'); 
  } catch (error) {
      console.error('Error signing out:', error);
  }
};
  return (
    <View style={{ flex: 1, alignItems: 'left', marginTop: '20%' }}>
      <Image source={{ uri: 'https://www.copee.eu/wp-content/uploads/2022/01/logo-white-02-3.png' }} style={styles.heroimg} resizeMode="contain"/>
      <TouchableOpacity onPress={handleLogout}style={styles.logoutButton}>
      <MaterialCommunityIcons name="logout" size={30} color="black"  /></TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('MainHomeScreen');}}
      >
        <View style={styles.menuItemContent}>
          
        <Ionicons name="newspaper-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.menuText}>Actualités</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={handleServicesPress}
      >
        <View style={styles.menuItemContent}>
          <MaterialIcons name="miscellaneous-services" size={24} color="black" style={styles.icon}/>
          <Text style={styles.menuText}>Nos Services</Text>
        </View>
      </TouchableOpacity>
      {showServicesSubMenu && (
        <>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate("Photovoltaique")}
          >
            <Text style={styles.subMenuText}>Photovoltaïque</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Chauffage')}
          >
            <Text style={styles.subMenuText}>Chauffage et eau chaude sanitaire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.subMenuItem}
            onPress={() => navigation.navigate('Domotique')}
          >
            <Text style={styles.subMenuText}>Domotique pour photovoltaïque</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('NosInstallations')}
      >
        <View style={styles.menuItemContent}>
          <MaterialIcons name="account-tree" size={24} color="black" style={styles.icon}/>
          <Text style={styles.menuText}>Nos Installations</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('NotreEquipe');}}
      >
        <View style={styles.menuItemContent}>
          <AntDesign name="team" size={24} color="black" style={styles.icon}/>
          <Text style={styles.menuText}>Notre Equipe</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('MyTests');}}
      >
        <View style={styles.menuItemContent}>
          <Fontisto name="test-tube" size={24} color="black" style={styles.icon}/>
          <Text style={styles.menuText}>Test d'Eligibilité</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('MessageScreen',{userDetails:{UserId:user.uid,SelectedImage:"https://firebasestorage.googleapis.com/v0/b/copee-41efa.appspot.com/o/COPEE.png?alt=media&token=cd10db43-2673-402c-9a71-e28d9519a354"}});}}
      >
        <View style={styles.menuItemContent}>
          <Entypo name="chat" size={24} color="black" style={styles.icon}/>
          <Text style={styles.menuText}>Chattez Avec Nous</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.socialButtonContainer}>
  <TouchableOpacity
    style={[styles.socialButton, {marginRight: 20}]}
    onPress={openLinkFacebook}
  >
    <Entypo name="facebook" size={32} color="#3b5998" />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.socialButton}
    onPress={openLinkX}
  >
    <FontAwesome6 name="x-twitter" size={32} color="black" />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.socialButton}
    onPress={openLinkLinkedin}
  >
    <AntDesign name="linkedin-square" size={32} color="#0a66c2" />
  </TouchableOpacity>
</View>
    </View>
  );
};

const styles = {
  menuItem: {
    padding: 10,
    paddingVertical:20,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    width: '100%',
    
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
  },
  menuText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },

  icon:{
    marginHorizontal:10
  },
  subMenuItem: {
    paddingLeft: 30, 
    paddingVertical: 10,
  },
  subMenuText: {
    fontSize: 15,
    color: 'black', 
  },
  heroimg: {
    width: '100%',
    height: 100, 
    marginBottom: 20, 
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 80,
    paddingHorizontal: 70,
  },
  socialButton: {
    marginTop: 10, 
    marginRight: 20, 
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex:1,
  },
};

export default SidebarScreen;
