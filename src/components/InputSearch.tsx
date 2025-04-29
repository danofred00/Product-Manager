import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";


export type InputSearchProps = {
    onTextChange: (text: string) => void,
    placeholder?: string,
}

export default function InputSearch({placeholder, onTextChange}: InputSearchProps)
{
    const [text, setText] = useState('')

    useEffect(() => {
        if(onTextChange) {
            onTextChange(text)
        }
    }, [text])

    return (
        <View style={styles.inputContainer}>
            <TextInput 
              placeholder={placeholder ?? "Filtrer les produits"} 
              style={{
                paddingVertical: 5,
                marginHorizontal: 5,
                flex: 1,
                borderWidth: 0,
                fontSize: 16
              }}
              value={text}
              onChange={(e) => setText(e.nativeEvent.text)}
            />
            <TouchableOpacity>
              <MaterialIcons 
                name='search' size={28} 
                color='white'
                style={{
                  padding: 5,
                  backgroundColor: Colors.light.tabIconSelected,
                  borderRadius: 10
                }} 
              />
            </TouchableOpacity>
          </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 3,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
})