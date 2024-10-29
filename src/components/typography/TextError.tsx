import { PropsWithChildren } from "react"
import { StyleSheet, Text } from "react-native"

export default function TextError({ children }: PropsWithChildren) {
    return (
        <Text style={styles.error}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 12
    }
})