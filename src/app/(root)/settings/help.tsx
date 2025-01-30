import Container from "@/components/Container";
import { StyleSheet, Text, View } from "react-native";


export default function HelpScreen()
{

  return (
    <Container style={styles.container}>
      <Text style={{textAlign: 'center'}}>
        Cette section sera disponible dans la prochaine version de l'application.
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {}
});
