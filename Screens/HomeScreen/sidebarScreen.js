import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { MaterialIcons, AntDesign, Fontisto, Entypo, Ionicons, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
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
  return (
    <View style={{ flex: 1, alignItems: 'left', marginTop: '20%' }}>
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
        onPress={() => handleMenuItemPress('Nos Installations')}
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
          navigation.navigate('test');}}
      >
        <View style={styles.menuItemContent}>
          <Fontisto name="test-tube" size={24} color="black" style={styles.icon}/>
          <Text style={styles.menuText}>Test d'Eligibilité</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleMenuItemPress('Contact')}
      >
        <View style={styles.menuItemContent}>
          <MaterialIcons name="connect-without-contact" size={24} color="black" style={styles.icon}/>
          <Text style={styles.menuText}>Contact</Text>
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
    paddingLeft: 30, // Adjust indentation for sub-menu items
    paddingVertical: 10,
  },
  subMenuText: {
    fontSize: 15,
    color: 'black', // Adjust color for sub-menu items
  },
};

export default SidebarScreen;
