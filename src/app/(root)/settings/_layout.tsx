
import { Stack } from "expo-router";

export default function SettingsLayout()
{
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerBackVisible: true,
        }}>
            <Stack.Screen name="account" options={{ title: 'Profil Personel'}}/>
            <Stack.Screen name="help" options={{ title: 'Aide'}}/>
            <Stack.Screen name="application" options={{ title: "Parametres d'application"}}/>
        </Stack>
    )
}