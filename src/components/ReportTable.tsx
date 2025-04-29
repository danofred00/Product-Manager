import { Product } from "@/types";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import Divider from "./Divider";

export type ReportTableProps = {
    products: Product[],
    date?: string
}

export default function ReportTable({products, date}: ReportTableProps)
{
    const {filteredProduct, total} = useMemo(() => {
        let total = 0
        const filteredProduct = products.filter((p) => p.received)
    
        filteredProduct.forEach(({price, sale}) => total += (sale ?? 0) * parseInt(price))
        return {
            filteredProduct, total
        }
    }, [products])

    const renderItem = ({item}: {item: Product}) => {
        return (
            <View style={styles.row}>
                <View style={styles.innerRow}>
                    <ThemedText style={{...styles.cell, textAlign:'left'}}>{item.name} {item.price} XAF</ThemedText>
                    <ThemedText style={styles.cell}>{item.received}</ThemedText>
                    <ThemedText style={styles.cell}>{item.sale}</ThemedText>
                    <ThemedText style={styles.cell}>{item.inStock}</ThemedText>
                </View>
                <Divider />
                <View style={styles.bottomRow}>
                    <ThemedText type="defaultSemiBold" >Sous total</ThemedText>
                    <ThemedText type="defaultSemiBold">{(item.sale ?? 0 ) * parseInt(item.price)} XAF</ThemedText>
                </View>
            </View>
        )
    }

    const FooterComponent = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <ThemedText type="subtitle">Total</ThemedText>
                <ThemedText type="subtitle">{total} XAF</ThemedText>
            </View>
        )
    }

    const HeaderComponent = () => {
        return (
            <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>{date}</ThemedText>
            </View>
        )
    }

    const EmptyList = () => {
        return (
            <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>La liste est vide</ThemedText>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {date && <HeaderComponent />}
            <View style={{backgroundColor: '#fff'}}>
                <View style={[styles.innerRow, styles.header]}>
                    <ThemedText type="defaultSemiBold" style={styles.heading}>Produits</ThemedText>
                    <ThemedText type="defaultSemiBold" style={styles.heading}>Recu</ThemedText>
                    <ThemedText type="defaultSemiBold" style={styles.heading}>Vendu</ThemedText>
                    <ThemedText type="defaultSemiBold" style={styles.heading}>Reste</ThemedText>
                </View> 
                <View style={styles.itemsContainer}>
                    <FlatList 
                        data={filteredProduct} 
                        renderItem={renderItem} 
                        keyExtractor={item => item.id?.toString() ?? ''}    
                        ListEmptyComponent={EmptyList}
                        ItemSeparatorComponent={Divider}
                        ListFooterComponent={FooterComponent}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    itemsContainer: {
        padding: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.light.tabIconSelected,
        paddingHorizontal: 5
    },
    heading: {
        fontWeight: 'bold',
        color: Colors.light.background,
        textAlign: 'center',
        width: '25%'
    },
    row: {},
    innerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cell: {
        width: '25%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        textAlign: 'center'
    },
    emptyContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 18
    }
})
