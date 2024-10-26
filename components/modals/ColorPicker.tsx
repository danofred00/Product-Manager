import { useState } from "react";
import { Modal, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import { Button } from "../inputs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { generateColorPalette } from "@/lib/utils";
import { ThemedText } from "../ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { kColorPickerCount } from "@/constants";
import Animated from "react-native-reanimated";

export type ModalColorPickerProps = {
    visible?: boolean,
    onRequestClose?: () => void,
    onSelected?: (color: string) => void,
    selectedColor?: string,
}

const colors = generateColorPalette(kColorPickerCount)

export function ModalColorPicker({visible, onRequestClose, onSelected, selectedColor}: ModalColorPickerProps)
{
    const [color, setColor] = useState<string>(selectedColor ?? '#fff')

    const onChoosePressed = () => {
        if (onSelected) { onSelected(color) }
        if (onRequestClose) { onRequestClose() }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
                <Modal 
                    visible={visible}
                    animationType="fade"
                    onRequestClose={onRequestClose}
                    transparent={true}
                >
                    <View style={modalStyles.backdrop} >
                        <TouchableOpacity 
                            onPress={onRequestClose}
                            style={{flex: 1}}
                        />
                        <Animated.View style={modalStyles.container}>
                            <View style={{alignItems: 'center'}}>
                                <View style={{width: 50, height: 5, backgroundColor: '#000', marginBottom: 10}} />
                                <ThemedText type="subtitle" style={{textAlign: 'center'}}>Pick a color</ThemedText>
                            </View>
                            <View>
                                <View style={[modalStyles.choosed, {backgroundColor: color}]}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>CH</Text>
                                </View>
                            </View>
                            <View style={modalStyles.colors}>
                                {colors.map((c, i) => {
                                    return (
                                        <TouchableOpacity key={i} onPress={() => setColor(c)} activeOpacity={0.7}>
                                            <View style={{
                                                backgroundColor: c, 
                                                width: 50, 
                                                height: 50, 
                                                borderRadius: 25, 
                                                borderWidth: 1,
                                            }}/>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <View style={modalStyles.actions}>
                                <Button 
                                    title="Choose" 
                                    icon={<MaterialIcons name="save" color='#fff' size={20} />}
                                    onPress={() => onChoosePressed()}
                                />
                                <Button 
                                    title="Close" 
                                    style={{backgroundColor: '#f00', }}
                                    onPress={onRequestClose}
                                    icon={<MaterialIcons name="close" size={20} color='#fff' />}
                                />
                            </View>
                        </Animated.View>
                    </View>
                </Modal>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const modalStyles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end'
    }, 
    container: {
        backgroundColor: '#fff',
        minHeight: '35%',
        elevation: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        gap: 15,
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row',
        gap: 10
    },
    colors: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginHorizontal: 'auto',
        gap: 10,
        width: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    choosed: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export type ColorPickerProps = {
    currentColor?: string,
    onColorChanged?: (color: string) => void,
    style?: StyleProp<ViewProps>,
    color?: string,
    text?: string
}

export function ColorPicker({text, currentColor, onColorChanged, style, color}: ColorPickerProps)
{
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Button 
                title={text ?? "Choose Color"}
                onPress={() => setVisible(true)}
                style={[style, {backgroundColor: color}]}
            />
            {   visible && 
                <ModalColorPicker 
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                    selectedColor={currentColor}
                    onSelected={onColorChanged}
                />
            }
        </>
    )
}