import React from 'react';
import { View, FlatList, StyleSheet, VirtualizedList } from 'react-native';
import {AvaliableProductCard} from './AvaliableProductCard';
import { DeliveryProduct } from '@/types';


export type AvailableProductListProps = {
    products: DeliveryProduct[],
    onDeliveryPressed: (delivery: DeliveryProduct, index: number) => void | Promise<void>
}

export function AvailableProductList({ products, onDeliveryPressed }: AvailableProductListProps) {

    return (
        <View style={styles.container}>
            {products.map((product, index) => {
                return (
                    <View key={index} style={{marginBottom: 20}}>
                        <AvaliableProductCard onPress={(delivery) => onDeliveryPressed(delivery, index) } product={product} />
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