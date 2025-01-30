
import { Control, useController } from "react-hook-form";
import { Switch as RNSwitch, SwitchProps as RNSwitchProps, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

export type SwitchProps = Omit<RNSwitchProps, 'value'|'onValueChange'> & {
    control?: Control<any, any>,
    label?: string,
    containerStyle?: ViewStyle,
    name: string,
    defaultValue?: boolean
}

export default function Switch({name, defaultValue, label, control, containerStyle, ...props}: SwitchProps)
{
    const { field: {value, onChange} } = useController({name, control, defaultValue: defaultValue ?? false})

    return (
        <View style={[styles.container, containerStyle]}>
            <ThemedText type="defaultSemiBold">{label}</ThemedText>
            <RNSwitch aria-label={label} value={value} onValueChange={onChange} {...props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})