import { useStore } from "@/hooks/useStore"
import { User } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function useAccountActions()
{
    const { setUser, user } = useStore()

    const updateAccount = async (user: User) => {
        AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
            setUser(user)
        })
    }

    const getAccount = async () => {
        const result = await AsyncStorage.getItem('user')
        if(result !== null) {
            setUser(JSON.parse(result) as User)
        }
    }

    return {
        user,
        getAccount,
        updateAccount
    }
}