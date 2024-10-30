import { SellProduct } from "@/types";
import { StyleSheet, View } from "react-native";
import SellView from "./SellView";

export type SellListProps = {
    sells: SellProduct[],
    onPress: (data: any) => void | Promise<void>
}

export default function SellList({sells, onPress}: SellListProps)
{
    return (
        <View style={styles.container}>
            {sells.map((sell, index) => {
                return (
                    <SellView key={index} sell={sell} onPress={onPress}  />
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