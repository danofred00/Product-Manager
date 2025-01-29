import { PropsWithChildren } from "react";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

export type SectionProps = PropsWithChildren & {
    title: string
}

export default function Section({children, title}: SectionProps)
{
    return (
        <View>
            <ThemedText type="subtitle">{title}</ThemedText>
            <View style={{marginTop: 15}}>
                {children}
            </View>
        </View>
    )
}