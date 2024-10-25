import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      
      <Tabs.Screen name="index" options={{
        title: "Accueil",
        tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
      }}/>
      
      <Tabs.Screen name="sells" options={{
        title: "Ventes",
        tabBarIcon: ({ color }) => <MaterialIcons name="sell" size={24} color={color} />,
      }}/>
      
      <Tabs.Screen name="deliveries" options={{
        title: "Livraisons",
        tabBarIcon: ({ color }) => <MaterialIcons name="delivery-dining" size={24} color={color} />,
      }}/>
      
      <Tabs.Screen name="products" options={{
        title: "Produits",
        tabBarIcon: ({ color }) => <MaterialIcons name="shopping-cart" size={24} color={color} />,
      }}/>
      
      <Tabs.Screen name="settings" options={{
        title: "Parametres",
        tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
      }}/>

    </Tabs>
  );
}
