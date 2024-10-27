import Container from '@/components/Container';
import { Button } from '@/components/inputs';
import InputSearch from '@/components/InputSearch';
import ProductsList from '@/components/products/ProductsList';
import { kProductTags } from '@/constants';
import { useStore } from '@/hooks/useStore';
import { Product, Tag } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


const TAGS: Tag[] = [
  {text: 'Tout', value: 'all'},
  ...kProductTags
]

function ProductsScreen() {

  const router = useRouter()
  const { products } = useStore()
  const [currentTag, setTag] = useState(0)
  const [search, setSearch] = useState('')
  const productFiltered = useMemo(() => {
    let newProducts = [...products].sort((a, b) => b.timestamp - a.timestamp)
    newProducts = currentTag === 0 ? newProducts : newProducts.filter(p => p.state?.toLowerCase() === TAGS[currentTag].value.toLowerCase())
    newProducts = search.length === 0 ? newProducts : newProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    return newProducts
  }, [products, currentTag, search])
  const counts = useMemo(() => {
    const counts = [productFiltered.length]
    for(const tag of [...TAGS].slice(1)) {
      counts.push(productFiltered.filter(p => p.state?.toLowerCase() === tag.value.toLowerCase()).length)
    }
    return counts
  }, [productFiltered])

  const onProductPressed = (product: Product) => {
    router.push(`/products/${product.id}`)
  }

  return (
    <Container style={styles.container}>
      <View style={{gap: 10}}>
        <InputSearch onTextChange={(text) => setSearch(text)} />
        <Button
          title='Ajouter un produit'
          icon={<MaterialIcons name='add' size={20} color='#fff' />}
          onPress={() => { router.push('/products/create') }}
        />
        <View style={styles.tags}>
          {TAGS.map((tag, index) => {
            const colors = [0, 0, 0]
            colors[index] = 200
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.tag, {backgroundColor: `rgb(${colors.reverse().join(',')})`}]} 
                onPress={() => setTag(index)} 
                activeOpacity={0.7}
              >
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  {tag.text} : <Text style={{}}>{counts[index]}</Text>
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <View>
        <ProductsList products={productFiltered} onPress={onProductPressed} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: { },
  tags: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center'
  },
  tag: {
    elevation: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10
  }
})

export default ProductsScreen