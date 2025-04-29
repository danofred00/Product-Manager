import React from 'react';
import { View, StyleSheet } from 'react-native';
import {DeliveryProductCard} from './DeliveryProductCard';
import { DeliveryProduct } from '@/types';


export type DeliveryProductListProps = {
    products: DeliveryProduct[],
    onDeliveryPressed: (delivery: DeliveryProduct, index: number) => void | Promise<void>
}

export function DeliveryProductList({ products, onDeliveryPressed }: DeliveryProductListProps) {

    return (
        <View style={styles.container}>
            {products.map((product, index) => {
                return (
                    <View key={index} style={{marginBottom: 20}}>
                        <DeliveryProductCard onPress={(delivery) => onDeliveryPressed(delivery, index) } product={product} />
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

export default DeliveryProductList;