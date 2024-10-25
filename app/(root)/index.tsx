import { userSelector } from '@/features/store';
import { fullname } from '@/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';

const WelcomeScreen = () => {

  const router = useRouter();
  const user = useSelector(userSelector)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Page {fullname(user)}</Text>
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