import { DeliveryProduct } from "@/types"
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Image } from "expo-image"

export type AvaliableProductCardProps = {
    product: DeliveryProduct
}

export function AvaliableProductCard({product}: AvaliableProductCardProps)
{
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.85}>
            <View style={{flexDirection: 'row', gap: 5}} >
                <Image source={{uri: product.image}} style={styles.image} contentFit="fill"/>
                <View>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productAmount}>XAF {product.price}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.stockText}>En stock</Text>
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