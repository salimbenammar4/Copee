import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarRating = ({ rating, size = 40, color = 'yellow' }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Text key={i} style={[styles.star, { fontSize: size, color: color }]}>★</Text>);
    } else {
      stars.push(<Text key={i} style={[styles.star, { fontSize: size, color: color }]}>☆</Text>);
    }
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  star: {
    marginRight: 2,
  },
});

export default StarRating;
