import { Image } from "expo-image";
import { StyleProp, View, ViewStyle } from "react-native";

export type UserAvatarProps = {
    uri: string,
    placeholder?: string,
    size?: number,
    radius?: number,
    style?: StyleProp<ViewStyle>
}

const defaultPlaceholderImage = require('@/assets/images/avatars/placeholder.png')

export default function UserAvatar({uri, placeholder, size = 100, radius = 50, style}: UserAvatarProps)
{
    return (
        <View style={[{ backgroundColor: '#dfdfdf', borderRadius: radius}, style]}>
            <Image 
                source={uri.trim().length !== 0 ? uri : (placeholder ?? defaultPlaceholderImage)} 
                contentFit="cover" 
                style={{
                    width: size,
                    height: size,
                    borderRadius: radius
                }}
            />
        </View>
    )
}