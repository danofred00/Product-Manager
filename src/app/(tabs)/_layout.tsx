import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useBootstrapApplication from '@/hooks/bootstrap/useBootstrapApplication';
import { useStore } from '@/hooks/useStore';
import { useEffect } from 'react';
import useAccountActions from '@/hooks/actions/useAccountActions';

export default function TabLayout() {
  useBootstrapApplication()
  const colorScheme = useColorScheme();
  const { products, deliveries, sells } = useStore()
  const { getAccount } = useAccountActions()

  useEffect(() => {
    getAccount()
  }, [])


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
          
          <Tabs.Screen name="sales" options={{
            title: "Mes Ventes",
            tabBarBadge: sells.length === 0 ? undefined : sells.length,
            tabBarIcon: ({ color }) => <MaterialIcons name="sell" size={24} color={color} />,
          }}/>
          
          <Tabs.Screen name="deliveries" options={{
            title: "Livraisons",
            tabBarBadge: deliveries.length === 0 ? undefined : deliveries.length,
            tabBarIcon: ({ color }) => <MaterialIcons name="delivery-dining" size={24} color={color} />,
          }}/>
          
          <Tabs.Screen name="products" options={{
            title: "Mes Produits",
            tabBarBadge: products.length === 0 ? undefined : products.length,
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
