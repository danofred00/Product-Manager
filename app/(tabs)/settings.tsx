import { Button, InputText } from '@/components/inputs';
import { userSelector } from '@/features/store';
import { setUser } from '@/features/store/user.store';
import { User } from '@/types';
import { Image } from 'expo-image';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const placeholderImage = require('@/assets/images/avatars/placeholder.png')

function SettingScreen () {

  const user = useSelector(userSelector)
  const dispatch = useDispatch()
  const [data, setData] = useState<User>(user)
  const [visible, showDialog] = useState(false)

  const updateProfile = () => {
    dispatch(setUser(data))
    showDialog(true)
    setTimeout(() => {
      showDialog(false)
    }, 1500)
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={{gap: 20}}>
          <Text style={styles.text}>
            Mettre à jour le profile
          </Text>
          {visible && <Text style={styles.success}>Profile mis a jour avec success</Text>}
          
          <View style={{
            alignItems: 'center',
          }}>
            <TouchableOpacity style={styles.imageContainer} activeOpacity={0.7}>
              <Image source={data.image === '' ? placeholderImage : data.image} style={styles.image} />
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <InputText 
              label='Nom' 
              placeholder='Votre nom' 
              value={data.firstname} 
              onChangeText={(firstname) => setData({...data, firstname})}
            />
            <InputText 
              label='Prenom' 
              placeholder='Votre prenom' 
              value={data.lastname} 
              onChangeText={(lastname) => setData({...data, lastname})}
            />
            <InputText 
              label='Biographie (optional)' 
              placeholder='Un petit texte pour vous decrire' 
              value={data.description} 
              onChangeText={(description) => setData({...data, description})}
            />
          </View>
          <View>
            <Button title='Enregistrer' onPress={updateProfile} />
          </View>
        </View>
        <View style={styles.space} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const padding = 15

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  imageContainer: {
    width: 150 + padding,
    height: 150 + padding,
    backgroundColor: '#dfdfdf',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#dfdfdf'
  },
  form: {
    flex: 1,
    gap: 10
  },
  space: {
    minHeight: Platform.OS === 'android' ? 50 : 10,
    width: 100
  },
  success: {
    color: '#fff',
    backgroundColor: 'green',
    textAlign: 'center',
    fontSize: 11,
    padding: 10
  }
});

export default SettingScreen;