import Container from '@/components/Container';
import ImagePicker from '@/components/ImagePicker';
import { Button, InputForm } from '@/components/inputs';
import UserAvatar from '@/components/UserAvatar';
import useAccountActions from '@/hooks/actions/useAccountActions';
import { myAlert } from '@/lib/alert';
import { userSchema } from '@/types/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, StyleSheet, Platform } from 'react-native';


export default function AccountScreen()
{
  const {user, updateAccount} = useAccountActions()
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(userSchema)
  })
  const [image, setImage] = useState(user.image)

  const updateProfile = async (data: any) => {
    await updateAccount({...data, image}).then(() => {
      myAlert({
        title: "Mise a jour effectue",
        message: "Votre profil a ete mis a jours avec success",
        actionText: "Ok"
      })
    })
  }

  return (
    <Container>
      <View style={{gap: 20}}>
          <Text style={styles.text}>
            Mettre à jour le profil
          </Text>

          <View style={{
            alignItems: 'center',
          }}>
            <ImagePicker setImage={(image) => setImage(image ?? user.image)}>
              <UserAvatar uri={image} size={150} radius={75} style={{padding: 3}}/>
            </ImagePicker>
          </View>
          <View style={styles.form}>

            <InputForm 
              label='Nom' 
              placeholder='Votre nom'
              name='firstname'
              control={control}
              defaultValue={user.firstname}
            />

            <InputForm 
              label='Prenom' 
              placeholder='Votre prenom' 
              name='lastname'
              control={control}
              defaultValue={user.lastname ?? ''}
            />

            <InputForm
              label='Biographie (optional)' 
              placeholder='Un petit texte pour vous decrire' 
              name='description'
              control={control}
              defaultValue={user.description}
            />

          </View>
          <View>
            <Button title='Enregistrer'  onPress={handleSubmit(updateProfile)} />
          </View>
        </View>
        <View style={styles.space} />
    </Container>
  );
};

const padding = 15

const styles = StyleSheet.create({
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
