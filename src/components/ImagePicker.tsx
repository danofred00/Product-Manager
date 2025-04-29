import { StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle } from "react-native"
import * as ExpoImagePicker from 'expo-image-picker'

export type ImagePickerProps = ViewProps & {
    style?: StyleProp<ViewStyle>,
    setImage?: (image?: string) => void | Promise<any>,
    preventPressEvent?: boolean
}

export default function ImagePicker({setImage, style, preventPressEvent, children, ...props}: ImagePickerProps)
{

    const pickImage = async () => {
        const result = await ExpoImagePicker.launchImageLibraryAsync({
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          cameraType: ExpoImagePicker.CameraType.front,
          // aspect: [4, 3],
          quality: 1,
        })
    
        if (result.assets && result.assets.length > 0) {
            if(setImage) {
                console.log(result)
                setImage(result.assets[0].uri)
            }
        }
      }

      const onPress = () => {
        if(preventPressEvent)
            return;
        pickImage()
      }

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.75} {...props}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})