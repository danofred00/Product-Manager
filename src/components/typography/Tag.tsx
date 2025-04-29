import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, useColorScheme } from "react-native";

export type TagProps = {
    tag: string,
    color?: string,
    bgColor?: string
}

export default function Tag({tag, color, bgColor}: TagProps)
{
    const textColor = color ?? useThemeColor({}, "text")
    const backgroundColor = bgColor ?? useThemeColor({}, 'background')

    return (
        <Text style={{
            color: textColor,
            backgroundColor,
            borderRadius: 20,
            textAlign: 'center',
            fontSize: 13,
            paddingVertical: 1,
            paddingHorizontal: 5,
            elevation: 0.3,
            fontWeight: 'semibold'
        }}>{tag}</Text>
    )
}