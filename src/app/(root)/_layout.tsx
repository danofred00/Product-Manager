import { Stack } from "expo-router";

export default function Layout()
{
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" />
            
            <Stack.Screen name="products/create" options={{
                headerShown: true,
                title: 'Ajouter un Produit'
            }} />
            <Stack.Screen name="products/[slug]" options={{headerShown: true, title: ''}}/>

            <Stack.Screen name="reports/index" options={{
                headerShown: true, 
                title: 'Rapport de vente'
            }} />
        </Stack>
    )
}