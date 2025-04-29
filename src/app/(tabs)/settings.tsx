import Container from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import UserAvatar from '@/components/UserAvatar';
import { Colors } from '@/constants/Colors';
import useAccountActions from '@/hooks/actions/useAccountActions';
import { fullname } from '@/lib/utils';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ReactElement, useState } from 'react';
import { Button, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

const settings = [
  {
    title: 'Profil personel', 
    description: 'Vos informations personnelles', 
    icon: <MaterialIcons name='account-circle' size={25} color={'#000'} />,
    url: '/settings/account'
  },
  {
    title: 'Parametres d\'application', 
    description: 'Modifiez les parametres de l\'appli', 
    icon: <MaterialIcons name='settings' size={25} color={'#000'} />,
    url: '/settings/application'
  },
  {
    title: 'Aide', 
    description: 'Obtenez de l\'aide dans l\'appli', 
    icon: <MaterialIcons name='help-outline' size={25} color={'#000'} />,
    url: '/settings/help'
  },
  {
    title: 'A Propos', 
    description: 'En savoir plus sur l\'application', 
    icon: <MaterialIcons name='info-outline' size={25} color={'#000'} />,
    url: '/about'
  },
]

export default function SettingScreen()
{
  const {user} = useAccountActions() 
  const router = useRouter()

  const openMyGithub = async () => {
    Linking.openURL('https://github.com/danofred00')
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <UserAvatar uri={user.image} size={100} />
        </View>
        <ThemedText type='subtitle'>{fullname(user)}</ThemedText>
      </View>
      <View style={{}}>
        {settings.map((setting, index) => {
          return (
            <Setting 
              setting={setting} 
              key={index} 
              onPress={item => {
                router.push({ pathname: setting.url })
              }} 
            />
          )
        })}
      </View>
      <View style={{backgroundColor: '#fff', padding: 10, borderRadius: 10, alignItems: 'center', gap: 5}}>
        <View style={[{flexDirection: 'row', gap: 10}]}>
          <ThemedText lightColor='gray' darkColor='gray' style={styles.centerText}>Made with ❤️ by</ThemedText> 
          <TouchableOpacity activeOpacity={1} onPress={() => openMyGithub()}>
            <ThemedText lightColor='#00f' darkColor='#00f' >Daniel Leussa</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  )
}

type SettingProps<T extends SettingItem> = {
  onPress: (item: T) => void,
  setting: T,
}

type SettingItem = {
  icon?: ReactElement,
  title: string,
  description?: string,
  url: string 
}

function Setting<T extends SettingItem>({onPress, setting}: SettingProps<T>) {
  const [touched, setTouched] = useState(false)
  return (
    <TouchableOpacity style={{
      backgroundColor: touched ? '#fff8' : '#fff',
      ...styles.setting
    }} 
    activeOpacity={1} 
    onPressIn={() => setTouched(true)} 
    onPressOut={() => setTouched(false)}
    onPress={() => onPress(setting)}
  >
      {setting.icon}
      <View style={{
        flex: 1
      }}>
        <ThemedText type='defaultSemiBold'>{setting.title}</ThemedText>
        {setting.description && <ThemedText>{setting.description}</ThemedText>}
      </View>
      <MaterialIcons name='chevron-right' size={25} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: {
    gap: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  avatarContainer: {
    width: 'auto',
    padding: 2,
    backgroundColor: Colors.light.tabIconSelected,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  setting: {
    flexDirection: 'row',
    borderWidth: 0.2,
    boxShadow: 'gray',
    marginBottom: 10,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5
  }, 
  centerText: {
    textAlign: 'center'
  }
})