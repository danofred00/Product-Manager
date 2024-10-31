import { Product } from "@/types"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import UserAvatar from "../UserAvatar"
import { LinearGradient } from "expo-linear-gradient"

export type InStockProductCardProps = {
    product: Product, 
    onPress: (product: Product) => void
}

export default function InStockProductCard({product, onPress}: InStockProductCardProps)
{
    const {image, inStock, sale, color, name, price, received} = product
    const imageSize = 40

    return (
        <TouchableOpacity 
            activeOpacity={0.99} 
            style={[styles.container, {borderColor: color, borderWidth: 1}]}
            onPress={() => onPress(product)}
        >
            <LinearGradient 
                colors={[color, '#ffffff']}
                style={{opacity: 0.2, position: 'absolute', zIndex: -1, bottom: 0, left: 0, top: 0, right: 0}}
            ></LinearGradient>
            <View style={styles.imageContainer}>
                <UserAvatar uri={image} size={imageSize} radius={imageSize/2}/>
                <View>
                    <Text style={{fontWeight: 'bold'}}>{name}</Text>
                    <Text>{price} XAF</Text>
                </View>
            </View>
            <View>
                <View style={styles.row}>
                    <Text style={styles.text}>{sale}</Text>
                    <Text>Vendu</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>{received}</Text>
                    <Text>Livrer</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>{inStock}</Text>
                    <Text>En stock</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        minWidth: 150,
        elevation: 1,
        gap: 10,
        position: 'relative',
        overflow: 'hidden'
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    row: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    text: { 
        fontWeight: 'bold'
    }
})