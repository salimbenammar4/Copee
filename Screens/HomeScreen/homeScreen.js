import React, { useEffect, useState } from 'react';
import { View, StatusBar, TouchableOpacity, Image, Text, ScrollView, Linking, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { fetchNews } from '../../api';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // State for tracking loading status

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetchNews();
        console.log('API response:', response); 
        if (response && response.organic) {
          setNews(response.organic);
        } else {
          console.warn('Organic search results not found in API response.');
          setNews([]);
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    
    fetchNewsData();
  }, []);

  const handleNewsPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <ImageBackground source={require('../../assets/man.jpg')} style={style.background}>
    <>
    
      <StatusBar backgroundColor="#9eb8cf" barStyle="dark-content" />
      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => navigation.openDrawer()}
        >
          <MaterialCommunityIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, lineHeight: 20, marginTop:10, textAlign:"center", marginBottom:10 }}>Actualités</Text>
        </View>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <MaterialCommunityIcons name="account-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {loading ? ( // Show loading indicator if loading is true
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <ScrollView style={{marginTop:10}}>
          {news.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleNewsPress(item.link)}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: '90%',
                alignSelf: 'center',
              }}
            >
              <View>
                <Text 
                  style={{ 
                    fontSize: 20, 
                    fontWeight: 'bold', 
                    marginBottom: 10, 
                    color: '#333' 
                  }}
                >
                  {item.title}
                </Text>
                <Text 
                  style={{ 
                    fontSize: 16, 
                    color: '#666', 
                    marginBottom: 15 
                  }}
                >
                  {item.snippet}
                </Text>
                <Text 
                  style={{ 
                    fontSize: 14, 
                    color: 'blue' 
                  }}
                >
                  {item.link}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
