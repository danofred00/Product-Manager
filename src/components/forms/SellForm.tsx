import { Delivery, Sell } from "@/types"
import { deliverySchema, sellSchema } from "@/types/schemas"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import { Button, InputForm } from "../inputs"
import { InferType } from "yup"
import { ThemedText } from "../ThemedText"
import {Picker} from "@react-native-picker/picker"
import { useStore } from "@/hooks/useStore"
import { ReactNode, useEffect, useState } from "react"

export type SellFormProps = {
    defaultValue?: Sell,
    onValidate: (data: Sell) => void,
    title?: string,
    actionText: string,
    cancelButton?: ReactNode
}

export default function SellForm({defaultValue, onValidate, title, actionText, cancelButton}: SellFormProps)
{
    const {products} = useStore()
    const [selectedProduct, setSelectedProduct] = useState<string>(defaultValue?.id || '1')

    const { handleSubmit, control, setValue } = useForm({
        resolver: yupResolver(sellSchema),
        defaultValues: {
            id: defaultValue?.id || "",
            product_id: defaultValue?.product_id || "",
            quantity: defaultValue?.quantity || ""
        }
    })

    useEffect(() => {
        setValue('product_id', selectedProduct)
    }, [selectedProduct])

    const submit = (data: InferType<typeof sellSchema>) => {
        onValidate({
            ...data,
            timestamp: Date.now()
        })
    }

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={{textAlign: 'center'}}>{title}</ThemedText>
            <View style={styles.form}>
                <View>
                    <ThemedText type="defaultSemiBold">Choisir le produit livre : </ThemedText>
                    <Picker selectionColor='#000' selectedValue={selectedProduct} onValueChange={(value) => setSelectedProduct(value)}>
                        {products.map((p, index) => {
                            return (
                                <Picker.Item key={index} value={p.id} label={`${p.name} - ${p.price} XAF`} />
                            )
                        })}
                    </Picker>
                </View>

                <InputForm
                    name="quantity"
                    control={control}
                    label="Quantite vendu"
                    placeholder="Ex: 10"
                    defaultValue={defaultValue?.quantity}
                />

                <InputForm
                    name="sell_at"
                    control={control}
                    label="Heure de vente (Optionel)"
                    placeholder="Ex: 11 h 30"
                    defaultValue={defaultValue?.sell_at || undefined}
                />

                <View style={{flexDirection: 'row', gap: 10}}>
                    <Button title={actionText} onPress={handleSubmit(submit)} />
                    {cancelButton}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        gap: 20
    },
    container: {
        gap: 10
    }
})