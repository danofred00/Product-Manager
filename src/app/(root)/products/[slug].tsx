import Container from '@/components/Container';
import ProductForm from '@/components/forms/ProductForm';
import { Button } from '@/components/inputs';
import useProductsActions from '@/hooks/actions/useProductsActions';
import { useStore } from '@/hooks/useStore';
import { myAlert } from '@/lib/alert';
import { objectEquals } from '@/lib/utils';
import { Product } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

const ExploreScreen = () => {

  const { slug } = useGlobalSearchParams()
  const {products} = useStore()
  const { updateProduct, removeProduct } = useProductsActions()
  const router = useRouter()
  const product = useMemo(() => {
    return products.filter(product => product.id === slug).at(0)
  }, [products])

  const onValidate = (data: Product) => {

    if(objectEquals(data, product)) {
      return;
    }

    updateProduct(product?.id ?? '' , data).then(() => {
      myAlert({
        message: 'Produit modifier avec success',
        title: 'Produit modifier',
        actionText: 'Ok',
        action: () => router.back()
      })
    })
  }

  const deleteProduct = () => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer ce produit?', [
      {text: 'Annuler'},
      {text: 'Supprimer', onPress: () => {
        removeProduct(product?.id ?? '').then(() => {
          myAlert({
            message: 'Produit supprimer avec success',
            title: 'Produit supprimer',
            actionText: 'Ok',
            action: () => router.back()
          })
        })
      }}
    ])
  }

  return (
    <Container style={styles.container}>
      <ProductForm 
        onValidate={onValidate} 
        actionButton='Enregistrer' 
        defaultValues={product}
        actionIcon={<MaterialIcons name='save' color='white' size={20} />}
        cancelButton={
          <Button 
            title='Supprimer'
            icon={<MaterialIcons name='delete' color='#fff' />}
            onPress={deleteProduct}
            style={{ backgroundColor: '#f00'}}
          />
        }
      />
      <View style={{height: 50}} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {

  },
});

export default ExploreScreen;