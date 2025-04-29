import { Alert, Platform } from "react-native"

export type AlertOption = {
    title?: string,
    message: string,
    action?: () => void,
    actionText?: string
}

export function myAlert({title, message, action, actionText}: AlertOption)
{
    if(Platform.OS === 'web') {
        alert(message)
        if(action) {
            action()
        }
    } else {
        Alert.alert(title??'', message, [
            {text: actionText, onPress: action}
        ])
    }
}