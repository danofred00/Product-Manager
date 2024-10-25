import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { DeliveryProduct } from '@/types';
import AvailableProductList from '@/components/products/AvaliableProductList';
import { ProductService } from '@/services/products.service';

const userAvatar = require('@/assets/images/avatars/default.png')

const HomePage = () => {

  const [avalivableProducts, setAvalivableProducts] = React.useState<DeliveryProduct[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [filter, setFilter] = React.useState<string>('')
  const products = useMemo(() => {
    return filter.length === 0 ? 
              avalivableProducts : 
              avalivableProducts.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
  }, [avalivableProducts, filter])

  useEffect(() => {
    ProductService.getProducts().then((products) => setAvalivableProducts(products))
    .finally(() => setLoading(false))
  }, [])

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.ScrollView scrollEventThrottle={16}>
        <Animated.View style={styles.containerTop}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{gap: 3}}>
              <ThemedText type='defaultSemiBold' lightColor='white'>Hello</ThemedText>
              <ThemedText type='title' lightColor='white' >John Doe</ThemedText>
            </View>
            <Image source={userAvatar} style={styles.avatar} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="Filtrer les produits" 
              style={{
                paddingVertical: 5,
                marginHorizontal: 5,
                flex: 1,
                borderWidth: 0,
                fontSize: 16
              }}
              value={filter}
              onChange={(e) => setFilter(e.nativeEvent.text)}
            />
            <TouchableOpacity>
              <MaterialIcons 
                name='search' size={28} 
                color='white'
                style={{
                  padding: 5,
                  backgroundColor: Colors.light.tabIconSelected,
                  borderRadius: 10
                }} 
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.containerBottom}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Mes Produits actifs</Text>
          <AvailableProductList products={products} />
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
  },
  avatar: {
    width: 50, 
    height: 50, 
    borderRadius: 50, 
    borderWidth: 1
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 3,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default HomePage;