import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Page</Text>
      <Link href="/(tabs)" style={styles.link}>Go to home</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  link: {
    fontSize: 15,
    color: 'blue',
  }
});

export default ExploreScreen;