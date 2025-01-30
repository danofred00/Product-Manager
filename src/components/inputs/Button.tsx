
import { Colors } from "@/constants/Colors"
import { ReactNode } from "react"
import {
    ButtonProps as RNButtonProps, 
    StyleProp, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    ViewStyle
} from "react-native"

export type ButtonProps = RNButtonProps & {
    style?: StyleProp<ViewStyle>,
    icon?: ReactNode
}

export default function Button({title, style, icon, color = '#ffffff', ...props}: ButtonProps)
{
    return (
        <TouchableOpacity style={[styles.container, style]} activeOpacity={0.8} {...props}>
            {icon}
            <Text style={[styles.text, {color}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        backgroundColor: Colors.light.tabIconSelected,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    }, 
    text: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    }
})