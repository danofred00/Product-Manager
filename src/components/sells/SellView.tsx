import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SellProduct } from "@/types";
import { Image } from "expo-image";

export type SellProps = {
    sell: SellProduct,
    onPress: (data: any) => void | Promise<void>
}

export default function SellView({sell, onPress}: SellProps)
{
    return (
        <TouchableOpacity style={[styles.container]} activeOpacity={0.85} onPress={() => onPress(sell as typeof sell)}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}} >
                <Image source={{uri: sell.image}} style={styles.image} contentFit="fill"/>
                <View>
                    <Text style={styles.productName}>{sell.name}</Text>
                    <Text style={styles.productAmount}>Prix : {sell.price} XAF</Text>
                    <Text style={styles.productAmount}>Vendu a : {sell.sell_at || 'NULL'}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.stockText}>Quantite</Text>
                <Text style={styles.stock}>{sell.quantity}</Text>
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
        backgroundColor: 'lightblue',
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