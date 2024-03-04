import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const NewsDetailsScreen = ({ route }) => {
  const { title, snippet, link } = route.params;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>
          {snippet}
        </Text>
        <Text style={{ fontSize: 16, color: 'blue' }}>
          {link}
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewsDetailsScreen;
