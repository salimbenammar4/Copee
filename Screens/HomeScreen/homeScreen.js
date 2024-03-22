import React, { useEffect, useState } from 'react';
import { View, StatusBar, TouchableOpacity, Text, ScrollView, Linking, ImageBackground, StyleSheet, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { fetchNews } from '../../api';

const { width } = Dimensions.get('window');

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
    <ImageBackground source={require('../../assets/man.jpg')} style={styles.background}>
      <>
        
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <MaterialCommunityIcons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Actualités</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <MaterialCommunityIcons name="account-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
        {loading ? ( // Show loading indicator if loading is true
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <ScrollView style={styles.newsContainer}>
            {news.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => handleNewsPress(item.link)}
                style={styles.newsItem}
              >
                <View>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsSnippet}>{item.snippet}</Text>
                  <Text style={styles.newsLink}>{item.link}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginLeft: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  profileButton: {
    marginRight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsContainer: {
    marginTop: 10,
  },
  newsItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.9,
    alignSelf: 'center',
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  newsSnippet: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  newsLink: {
    fontSize: 14,
    color: 'blue',
  },
});

export default HomeScreen;
