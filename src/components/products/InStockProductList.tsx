import { Product } from "@/types"
import { StyleSheet, View } from "react-native"
import InStockProductCard from "./InStockProductCard"

export type InStockProductListProps = {
    products: Product[],
    onPress?: (product: Product, index: number) => void
}

export default function InStockProductList({products, onPress}: InStockProductListProps)
{
    return (
        <View style={[styles.container]}>
            {products.map((product, index) => {
                return (
                    <InStockProductCard 
                        onPress={(p) => onPress ? onPress(p, index) : {}} 
                        product={product} 
                        key={index}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15
    }
})