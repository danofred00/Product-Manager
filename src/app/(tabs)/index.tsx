import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { ReactElement, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
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
import Section from '@/components/Section';
import { MaterialIcons } from '@expo/vector-icons';

const HomePage = () => {

  const {products: productsDb, sells, deliveries} = useStore()
  const [filter, setFilter] = useState<string>('')
  const {user} = useAccountActions()
  const {products, totalSales, estimatedTotal} = useResumeProducts({deliveries, sales: sells, products: productsDb})
  const productFiltered = useMemo(() => {
    return products.filter(({name}) => {
      return name.toLowerCase().includes(filter.toLowerCase())
    }).sort((a, b) => b.sale - a.sale)
  }, [products, filter])
  const router = useRouter()

  const onFloatingButtonPressed = () => {
    router.push({
      pathname: '/(root)/reports',
      params: { products: JSON.stringify(products) }
    })
  }

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
          
          <Section title='Resume'>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', gap: 15, flexWrap: 'wrap'}}>
              <ResumeComponent 
                number={totalSales}
                title='Total Ventes'
                icon={<MaterialIcons name='sell' color={'#fff'} size={42}/>}
                backgroundColor='green'
                styles={{width: '45%'}}
              />
              <ResumeComponent 
                number={estimatedTotal}
                currency={'F'}
                title='Montant estime'
                icon={<MaterialIcons name='attach-money' color={'#fff'} size={50}/>}
                backgroundColor='orange'
                styles={{width: '45%'}}
              />
            </View>
          </Section>

          <Section title='Mes Produits en stock'>
            <InStockProductList products={productFiltered} onPress={({id}) => router.push(`/products/${id}`)} />
          </Section>

          <View style={{height: 20}} />

        </View>
      </Animated.ScrollView>

      <TouchableOpacity activeOpacity={0.7} style={styles.floating} onPress={onFloatingButtonPressed}>
        <MaterialIcons name='assignment' color={Colors.light.background} size={28} />
      </TouchableOpacity>

    </GestureHandlerRootView>
    
  );
};

function ResumeComponent(props: {currency?: string, number: number, icon: ReactElement, title: string, backgroundColor?: string, styles?: ViewStyle})
{
  const {icon, number, title, backgroundColor, styles: _styles, currency} = props

  return (
    <View style={[styles.resumeContainer, _styles]}>
        <View style={{flex: 0.5, backgroundColor, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          {icon}
        </View>
        <View style={{alignItems: 'center', gap: 7, flex: 1, padding: 5}}>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>{number} {currency}</Text>
          <Text style={{textAlign: 'center'}}>{title}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  resumeContainer: { 
    borderRadius: 20, 
    flexDirection: 'row',
    alignItems: 'center',
    height: 125,
    backgroundColor: '#fff',
    shadowColor: 'gray',
    overflow: 'hidden',
    width: '100%'
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
  },
  floating: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.light.tabIconSelected,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  }
});

export default HomePage;