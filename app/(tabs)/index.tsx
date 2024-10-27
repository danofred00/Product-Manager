import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { DeliveryProduct } from '@/types';
import AvailableProductList from '@/components/products/AvaliableProductList';
import { ProductService } from '@/services/products.service';
import { fullname } from '@/lib/utils';
import UserAvatar from '@/components/UserAvatar';
import InputSearch from '@/components/InputSearch';
import useAccountActions from '@/hooks/actions/useAccountActions';


const HomePage = () => {

  const [avalivableProducts, setAvalivableProducts] = React.useState<DeliveryProduct[]>([])
  const [filter, setFilter] = React.useState<string>('')
  const products = useMemo(() => {
    return filter.length === 0 ? 
              avalivableProducts : 
              avalivableProducts.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
  }, [avalivableProducts, filter])
  const {user} = useAccountActions()

  useEffect(() => {
    ProductService.getDeliveryProducts().then((products) => setAvalivableProducts(products))
  }, [])

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.ScrollView scrollEventThrottle={16}>
        <Animated.View style={styles.containerTop}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{gap: 3}}>
              <ThemedText type='defaultSemiBold' lightColor='white'>Hello</ThemedText>
              <ThemedText type='title' lightColor='white' >{fullname(user)}</ThemedText>
            </View>
            <UserAvatar uri={user.image} size={50} radius={25} style={{padding: 1}}/>
          </View>
          <View>
            <InputSearch onTextChange={(text) => setFilter(text)} />
          </View>
        </Animated.View>
        <View style={styles.containerBottom}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Mes Produits actifs</Text>
          { /* <AvailableProductList products={products} /> */ }
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
    height: '100%'
  }
});

export default HomePage;