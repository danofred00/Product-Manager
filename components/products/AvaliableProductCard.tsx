import { DeliveryProduct } from "@/types"
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Image } from "expo-image"
import { useMemo } from "react"

export type AvaliableProductCardProps = {
    product: DeliveryProduct,
    onPress: (delivery: DeliveryProduct) => void | Promise<void>
}

export function AvaliableProductCard({product, onPress}: AvaliableProductCardProps)
{
    const time = useMemo(() => {
        return product.delivery_at
    }, [product])

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.85} onPress={() => onPress(product)}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}} >
                <Image source={{uri: product.image}} style={styles.image} contentFit="fill"/>
                <View>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productAmount}>Prix : {product.price} XAF</Text>
                    <Text style={styles.productAmount}>Livre a : {time}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.stockText}>Quantite</Text>
                <Text style={styles.stock}>{product.quantity}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        elevation: 2,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    productName: {
        fontSize: Platform.OS === 'web' ? 20 : 15,
        fontWeight: 'bold'
    },
    productAmount: {
        fontSize: 15,
        fontWeight: 'semibold'
    },
    stockText: {
        fontSize: Platform.OS === 'web' ? 14 : 11,
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontWeight: 'semibold'
    },
    stock: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: { 
        borderRadius: 25, 
        width:50, 
        height:50, 
        backgroundColor:'#000',
    }
})