import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export type InputTextProps = TextInputProps & {
    label?: string,
    inputStyle?: StyleProp<TextStyle>,
}

export default function InputText({label, style, inputStyle, ...props}: InputTextProps)
{
    return (
        <View style={[styles.container, style]}>
            <ThemedText style={styles.label} type="defaultSemiBold">{label}</ThemedText>
            <TextInput style={[styles.input, inputStyle]} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    label: {
        marginBottom: 5,
        color: Colors.light.text
    }, 
    input: {
        backgroundColor: Colors.light.background,
        padding: 10,
        borderRadius: 10,
        elevation: 1
    }
})