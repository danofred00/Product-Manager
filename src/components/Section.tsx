import { PropsWithChildren } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

export type SectionProps = PropsWithChildren & {
    title: string,
    titleStyle?: TextStyle,
    contentContainerStyle?: ViewStyle,
    style?: ViewStyle
}

export default function Section({children, title, titleStyle, contentContainerStyle, style}: SectionProps)
{
    return (
        <View style={style}>
            <ThemedText type="subtitle" style={titleStyle}>{title}</ThemedText>
            <View style={[{marginTop: 15}, contentContainerStyle]}>
                {children}
            </View>
        </View>
    )
}