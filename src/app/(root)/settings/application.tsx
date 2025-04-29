import Container from "@/components/Container";
import { Button } from "@/components/inputs";
import Section from "@/components/Section";
import useBootstrapDatabase from "@/hooks/bootstrap/useBootstrapDatabase";
import { Alert, StyleSheet, Text } from "react-native";


export default function AppSettingScreen()
{
  const { setup, uninstall } = useBootstrapDatabase()

  const clearDatabase = async () => {

    const action = async () => {
      console.log('[+] Clearing Database ...')
      await uninstall().then(() => setup(false))
      console.log("[+] Done")
    }

    Alert.alert(
      'Supprimer vos donnees',
      "Etes vous sure de vouloir vraiment poursuivre cette action ?",
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: action }  
      ]
    )
    
  }

  return (
    <Container style={styles.container}>
      <Section 
        title="Supprimer les donnees" 
        titleStyle={{color: '#f00'}}
      >
        <Text style={{marginBottom: 10}}>
          Attention!! Les donnees que vous supprimerez ici seront irrecuperables. Cela 
          concerne bien evidement votre historique de ventes.  
        </Text>
        <Button 
          title="Supprimer" 
          style={{borderColor: '#f00', backgroundColor: 'transparent', borderWidth: 2}}
          color='#f00'
          onPress={clearDatabase}
        />
      </Section>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {}
});
