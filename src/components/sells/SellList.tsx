import { SaleProduct } from "@/types";
import { StyleSheet, View } from "react-native";
import SellView from "./SellView";

export type SellListProps = {
    sells: SaleProduct[],
    onPress: (data: any) => void | Promise<void>
}

export default function SellList({sells, onPress}: SellListProps)
{
    return (
        <View style={styles.container}>
            {sells.map((sale, index) => {
                return (
                    <SellView key={index} sale={sale} onPress={onPress}  />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        padding: 20
    }
})