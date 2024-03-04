import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function WelcomeScreen() {
    const navigation = useNavigation();
    const goToLogin = () => {
        navigation.replace('Login'); 
      };
      const openLink = () => {
        Linking.openURL('https://www.copee.eu/');
    };
  return (
    <>
    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
    <SafeAreaView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Image source={{ uri: 'https://www.copee.eu/wp-content/uploads/2022/01/logo-white-02-3.png' }} style={styles.heroimg} resizeMode="contain"/>
      </View>
      <View style={styles.contents}>
        <View style={styles.header}>
          <Text style={styles.title}>L'innovation, le partage et l'intégrité avec COPEE </Text>
          <Text style={styles.message}>COPEE est une société spécialisée, depuis plusieurs années, dans le secteur des énergies renouvelables. En effet, nous sommes conscient des enjeux environnementaux actuels. C'est pourquoi nous mettons tout en oeuvre afin de vous proposer des solutions énergétiques en totale adéquation avec le respect de notre planète. Par ailleurs, nous souhaitons également vous apporter un service qui réponde aussi bien à vos besoins de confort, de sécurité ou de communication. Chez COPEE, on s'occupe de tout, de A à Z !</Text>
          <TouchableOpacity onPress={openLink}>
                            <Text style={styles.ensavoir}>En savoir plus</Text>
            </TouchableOpacity>
            <Text style={styles.under}>Vous pouvez se connecter pour bénificier de nos services!</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() =>{
            goToLogin()
        }}>
            <Text style={styles.btnText}>C'est Parti!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    flexGrow: 1,
  },
  contents: {
    padding: 24,
  },
  title: {
    fontSize: 25,
    lineHeight: 40,
    fontWeight: '500',
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    fontSize: 13,
    lineHeight: 24,
    color: "black",
    textAlign: "center"
  },
  under: {
    marginTop:5,
    fontSize: 13,
    lineHeight: 24,
    color: "black",
    textAlign:"center"
  },
  ensavoir: {
    marginTop:10,
    fontSize: 15,
    lineHeight: 24,
    color: "blue",
    alignSelf:"center"
  },
  header: {
    paddingHorizontal: 34,
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
  btn:{
    marginTop:15,
    backgroundColor:'#56409e',
    paddingVertical:12,
    paddingHorizontal:14,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:14,
  },
  btnText:{
    fontSize:15,
    fontWeight:'500',
    color:'white',
  }
});
