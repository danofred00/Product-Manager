
import Container from '@/components/Container';
import FirstUserForm from '@/components/forms/FirstUserForm';
import { Button, InputText } from '@/components/inputs';
import { ThemedText } from '@/components/ThemedText';
import useAccountActions from '@/hooks/actions/useAccountActions';
import useDetectFirstRun from '@/hooks/useDetectFirstRun';
import { User } from '@/types';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WelcomeScreen = () => {

  const router = useRouter();
  const {loading, isFirstRun} = useDetectFirstRun()
  const {updateAccount} = useAccountActions()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    if(!loading && !isFirstRun) {
      router.replace('/(tabs)/')
    }
  }, [loading])

  if (loading || !isFirstRun) {
    return null;
  }

  const onValidate = (data: User) => {
    updateAccount(data).then(() => {
      router.replace('/(tabs)/')
    })
  }

  return (
    <Container style={[styles.container, {top: insets.top}]}>
      <View>
        <ThemedText type='title'>Bienvenu</ThemedText>
        <ThemedText style={{textAlign: 'left'}}>
          Salut, et bienvenu dans mon application de gestion.
          Pour configurer l'application, j'ai besoin que vous entrez
          votre nom pour continuer.
        </ThemedText>
        <FirstUserForm onValidate={onValidate} />
      </View>
    </Container>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10
  },
  text: {
    fontSize: 20,
  },
});

export default WelcomeScreen;