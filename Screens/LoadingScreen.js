import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/download.png')}
        style={styles.logo}
      />
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, 
    height: 200, 
    marginBottom: 20,
  },
});

export default LoadingScreen;
