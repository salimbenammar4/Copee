import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoadingScreen from './Screens/LoadingScreen';
import LoginScreen from './Screens/Login/login';
import WelcomeScreen from './Screens/Welcome/welcome';
import HomeScreen from './Screens/HomeScreen/homeScreen';
import SidebarScreen from './Screens/HomeScreen/sidebarScreen';
import Profile from './Screens/Profile/Profile';
import ModifyProfile from './Screens/ModifyProfile/ModifyProfile';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase';
import SignupScreen from './Screens/Signup/signup';
import NewsDetailsScreen from './Screens/NewsDetails/NewsDetails';
import NotreEquipe from './Screens/NotreEquipe/NotreEquipe';
import Photovoltaïque from './Screens/Photovoltaique/Photovoltaique';
import Chauffage from './Screens/Chauffage/Chauffage';
import Domotique from './Screens/Domotique/Domotique';
import Test from './Screens/Test/test';
import Dashboard from './Screens/AdminDashboard/dashboard';
import ManageUsers from './Screens/AdminDashboard/ManageUsers';
import form from './Screens/AdminDashboard/form';
import ManagePersonnel from './Screens/AdminDashboard/ManagePersonnel';
import ManageClients from './Screens/AdminDashboard/ManageClients';
import ForgotPasswordScreen from './Screens/forgotPassword/forgot';
import ChatScreen from './Screens/ChatScreen'
import MessageScreen from './Screens/MessageScreen'
import NosInstallations from './Screens/NosInstallations/NosInstallations';
import MyTests from './Screens/MyTests/MyTests';
import PersonnelDashboard from './Screens/PersonnelDashboard/PersonnelDashboard';
import AllTests from './Screens/PersonnelDashboard/AllTests';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user authentication state

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsAppLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (isAppLoading) {
    return <LoadingScreen />;
  }




  return (
    <NavigationContainer>
      <Stack.Navigator >
  <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
  <Stack.Screen name="NewsDetails" component={NewsDetailsScreen}/>
  <Stack.Screen name="Profile" component={Profile} options={{
                        headerStyle: {
                            backgroundColor: '#4c4849', // Header color for NotreEquipe screen
                        },
                        headerTintColor: 'white', // Text color for the header
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}/>
  <Stack.Screen name="ModifyProfile" component={ModifyProfile} options={{
                        headerStyle: {
                            backgroundColor: '#4c4849', // Header color for NotreEquipe screen
                        },
                        headerTintColor: 'white', // Text color for the header
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },title: "Modifier le profil"
                    }}/>
  <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }}/>
  <Stack.Screen name="ManageUsers" component={ManageUsers} options={{ headerShown: false }}/>
  <Stack.Screen name="Form" component={form} options={{ headerShown: false }}/>
  <Stack.Screen name="Personnel" component={ManagePersonnel} options={{ headerShown: false }}/>
  <Stack.Screen name="Clients" component={ManageClients} options={{ headerShown: false }}/>
  <Stack.Screen name="forgot" component={ForgotPasswordScreen} options={{ headerShown: false }}/>   
  <Stack.Screen name="ChatScreen" component={ChatScreen} options={ {title: "Chat", headerStyle: {
                            backgroundColor: '#56c1d0', // Header color for NotreEquipe screen
                        },} }/>    
  <Stack.Screen name="MessageScreen" component={MessageScreen} options={ {title: "Chat"} }/>  
  <Stack.Screen name="PersonnelDashboard" component={PersonnelDashboard} options={{ headerShown: false }}/> 
  <Stack.Screen name="AllTests" component={AllTests} options={{ headerShown: false }}/> 

          
</Stack.Navigator>
    </NavigationContainer>
  );
  
  
};

const HomeStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <SidebarScreen {...props} />}>
      <Drawer.Screen name="MainHomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="NotreEquipe" component={NotreEquipe} options={{ headerShown: false }}/>
      <Drawer.Screen name="Photovoltaique" component={Photovoltaïque} options={{headerShown:false}}/>
      <Drawer.Screen name="Chauffage" component={Chauffage} options={{headerShown:false}}/>
      <Drawer.Screen name="Domotique" component={Domotique} options={{headerShown:false}}/>
      <Stack.Screen name="test" component={Test} options={{ headerShown: false }}/>
      <Stack.Screen name='NosInstallations' component={NosInstallations} options={{ headerShown: false }}/>
      <Stack.Screen name='MyTests' component={MyTests} options={{headerShown: false}}/>
    </Drawer.Navigator>
  );
};

export default App;
