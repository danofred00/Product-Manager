import Container from "@/components/Container";
import { Alert, Platform, StyleSheet, View } from "react-native"
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import useProductsActions from "@/hooks/actions/useProductsActions";
import ProductForm from "@/components/forms/ProductForm";
import { Product } from "@/types";
import { myAlert } from "@/lib/alert";

export default function CreateProductPage() {

    const { addProduct } = useProductsActions()
    const router = useRouter()

    const onValidate = async (data: Product) => {
        await addProduct({...data, timestamp: Date.now()})
        myAlert({
            title: 'Produit ajouter',
            message: 'Le produit a ete ajouter avec success.',
            actionText: 'Ok',
            action: () => router.back()
        })
    }

    return (
        <Container>
            <ProductForm
                actionButton="Ajouter"
                actionIcon={<MaterialIcons name="add" color='#fff' size={20}/>}
                onValidate={onValidate}
            />
            <View style={{height: 50}} />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})