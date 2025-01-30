import { Product } from "@/types"
import { StyleSheet, View } from "react-native"
import InStockProductCard from "./InStockProductCard"
import { ThemedText } from "../ThemedText"

export type InStockProductListProps = {
    products: Product[],
    onPress?: (product: Product, index: number) => void
}

export default function InStockProductList({products, onPress}: InStockProductListProps)
{
    return (
        <View style={[styles.container]}>
            {products.length === 0 && (
                <View style={{flex: 1}} >
                    <ThemedText style={{textAlign: 'center'}}>
                        Aucune livraison pour le moment. Allez dans la section {' '}
                        <ThemedText type="defaultSemiBold" style={{fontStyle: 'italic'}}>Mes Livraisons</ThemedText> pour en rajouter
                    </ThemedText>
                </View>
            )}
            {products.map((product, index) => {
                return (
                    <InStockProductCard 
                        onPress={(p) => onPress ? onPress(p, index) : {}} 
                        product={product} 
                        key={index}
                        style={{ flex: 1}}
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