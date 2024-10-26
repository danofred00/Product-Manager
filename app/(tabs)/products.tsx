import Container from '@/components/Container';
import { Button } from '@/components/inputs';
import ProductsList from '@/components/products/ProductsList';
import { useStore } from '@/hooks/useStore';
import { Product } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

function ProductsScreen() {

  const router = useRouter()
  const { products } = useStore()
  const productFiltered = useMemo(() => {
    return [...products].sort((a, b) => b.timestamp - a.timestamp)
  }, [products])

  const onProductPressed = (product: Product) => {
    router.push(`/products/${product.id}`)
  }

  return (
    <Container style={styles.container}>
      <View>
        <Button 
          title='Ajouter un produit'
          icon={<MaterialIcons name='add' size={20} color='#fff' />}
          onPress={() => { router.push('/products/create') }}
        />
      </View>
      <View>
        <ProductsList products={productFiltered} onPress={onProductPressed} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    
  }
})

export default ProductsScreen