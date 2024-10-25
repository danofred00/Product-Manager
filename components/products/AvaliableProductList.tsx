import React from 'react';
import { View, FlatList, StyleSheet, VirtualizedList } from 'react-native';
import {AvaliableProductCard} from './AvaliableProductCard';
import { DeliveryProduct } from '@/types';


export type AvailableProductListProps = {
    products: DeliveryProduct[]
}

export function AvailableProductList({ products }: AvailableProductListProps) {

    return (
        <View style={styles.container}>
            {products.map((product, index) => {
                return (
                    <View key={index} style={{marginBottom: 20}}>
                        <AvaliableProductCard product={product} />
                    </View>
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default AvailableProductList;