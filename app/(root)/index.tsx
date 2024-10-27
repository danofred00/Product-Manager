
import useDetectFirstRun from '@/hooks/useDetectFirstRun';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const WelcomeScreen = () => {

  const router = useRouter();
  const {loading, isFirstRun} = useDetectFirstRun()

  useEffect(() => {
    if(!loading && !isFirstRun) {
      router.replace('/(tabs)/')
    }
  }, [loading])

  if (loading || !isFirstRun) {
    return null;
  }

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