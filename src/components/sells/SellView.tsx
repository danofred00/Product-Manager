import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SaleProduct } from "@/types";
import { Image } from "expo-image";

export type SellProps = {
    sale: SaleProduct,
    onPress: (data: any) => void | Promise<void>
}

export default function SellView({sale, onPress}: SellProps)
{
    return (
        <TouchableOpacity style={[styles.container]} activeOpacity={0.85} onPress={() => onPress(sale as typeof sale)}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}} >
                <Image source={{uri: sale.image}} style={styles.image} contentFit="fill"/>
                <View>
                    <Text style={styles.productName}>{sale.name}</Text>
                    <Text style={styles.productAmount}>Prix : {sale.price} XAF</Text>
                    { sale.is_rest ? 
                        <Text style={[styles.stockText, {backgroundColor: 'lightgreen'}]}>Reste</Text> : 
                        <Text style={[styles.stockText, styles.productAmount, {backgroundColor: 'yellow'}]}>Vendu a : {sale.sale_at || 'NULL'}</Text>
                    }
                </View>
            </View>
            <View>
                <Text style={styles.stockText}>Quantite</Text>
                <Text style={styles.stock}>{sale.quantity}</Text>
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