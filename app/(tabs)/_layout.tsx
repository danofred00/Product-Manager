import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: true,
          }}>
          
          <Tabs.Screen name="index" options={{
            title: "Accueil",
            headerShown: false,
            tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
          }}/>
          
          <Tabs.Screen name="sells" options={{
            title: "Mes Ventes",
            tabBarIcon: ({ color }) => <MaterialIcons name="sell" size={24} color={color} />,
          }}/>
          
          <Tabs.Screen name="deliveries" options={{
            title: "Livraisons",
            tabBarIcon: ({ color }) => <MaterialIcons name="delivery-dining" size={24} color={color} />,
          }}/>
          
          <Tabs.Screen name="products" options={{
            title: "Mes Produits",
            tabBarIcon: ({ color }) => <MaterialIcons name="shopping-cart" size={24} color={color} />,
          }}/>
          
          <Tabs.Screen name="settings" options={{
            title: "Parametres",
            tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
          }}/>

        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
