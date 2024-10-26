import { Product } from "@/types"
import { StyleSheet, View } from "react-native"
import ProductCard from "./ProductCard"

export type ProductsListProps = {
    products: Product[],
    onPress?: (product: Product) => void
}

export default function ProductsList({products, onPress}: ProductsListProps)
{

    const onPressCb = (product: Product) => {
        if(onPress) {
            onPress(product)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {products.map((product, index) => {
                    return (
                        <ProductCard key={index} product={product} onPress={() => onPressCb(product)} />
                    )
                })}
            </View>
            <View style={{height: 25}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        marginTop: 20
    }
})