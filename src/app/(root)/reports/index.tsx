import Container from "@/components/Container";
import ReportTable from "@/components/ReportTable";
import { Product } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Report()
{
    const { products, date } = useLocalSearchParams<{products?: string, date?: string}>()

    return (
        <Container>
            <ReportTable 
                products={JSON.parse(products ?? '[]') as Product[]} 
                date={date}
            />
            <View style={{height: 50}} /> 
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})