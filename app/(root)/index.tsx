import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';

const WelcomeScreen = () => {

  const router = useRouter();
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Page</Text>
      <Button title="Go to Home" onPress={() => router.navigate('/(tabs)/')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  text: {
    fontSize: 20,
  },
});

export default WelcomeScreen;