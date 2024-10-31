import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { fullname } from '@/lib/utils';
import UserAvatar from '@/components/UserAvatar';
import InputSearch from '@/components/InputSearch';
import useAccountActions from '@/hooks/actions/useAccountActions';
import { useStore } from '@/hooks/useStore';
import { useResumeProducts } from '@/hooks/useResumeProducts';
import InStockProductList from '@/components/products/InStockProductList';
import { useRouter } from 'expo-router';


const HomePage = () => {

  const {products: productsDb, sells, deliveries} = useStore()
  const products = useResumeProducts({deliveries, sales: sells, products: productsDb})
  const [filter, setFilter] = useState<string>('')
  const {user} = useAccountActions()
  const productFiltered = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  }, [products, filter])
  const router = useRouter()


  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.ScrollView scrollEventThrottle={16}>
        <Animated.View style={styles.containerTop}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{gap: 3}}>
              <ThemedText type='defaultSemiBold' lightColor='white'>Hi, </ThemedText>
              <ThemedText type='title' lightColor='white' >{fullname(user)}</ThemedText>
            </View>
            <UserAvatar uri={user.image} size={50} radius={25} style={{padding: 1}}/>
          </View>
          <View>
            <InputSearch onTextChange={(text) => setFilter(text)} />
          </View>
        </Animated.View>
        <View style={styles.containerBottom}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Mes Produits en stock</Text>
          <InStockProductList products={productFiltered} onPress={(p) => router.push(`/products/${p.id}`)} />
        </View>
      </Animated.ScrollView>
    </GestureHandlerRootView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerTop: {
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: Platform.OS === 'web' ? 10 : 40,
    paddingBottom: 30,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.light.tabIconSelected,
  },
  containerBottom: {
    flex: 1,
    padding: 15,
    backgroundColor: '#efefef',
    minHeight: 200,
    height: '100%',
    gap: 20
  }
});

export default HomePage;