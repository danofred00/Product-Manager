import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export type ContainerProps = PropsWithChildren & {
    style?: StyleProp<ViewStyle>
}

export default function Container({children, style}: ContainerProps)
{
    return (
        <GestureHandlerRootView style={styles.container}>
            <Animated.ScrollView style={[styles.scrollView, style]}>
                {children}
            </Animated.ScrollView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    scrollView: {
        flex: 1,
        padding: 15
    }
})