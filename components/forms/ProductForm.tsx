import { Product } from "@/types"
import { productSchema } from "@/types/schemas"
import { yupResolver } from "@hookform/resolvers/yup"
import { ReactNode, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { StyleSheet, Text, View } from "react-native"
import ImagePicker from "../ImagePicker"
import { Image } from "expo-image"
import TextError from "../typography/TextError"
import { Button, InputForm } from "../inputs"
import { ColorPicker } from "../modals/ColorPicker"
import { Picker } from "@react-native-picker/picker"


export type ProductFormProps = {
    onValidate: (data: Product) => void | Promise<void>,
    defaultValues?: Product,
    actionButton: string,
    actionIcon: ReactNode,
    cancelButton?: ReactNode
}

export default function ProductForm({ defaultValues, onValidate, actionButton, actionIcon, cancelButton }: ProductFormProps) {
    const { handleSubmit, control, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(productSchema),
        mode: 'all',
        defaultValues
    })
    const [image, setImage] = useState<string>(defaultValues?.image ?? '')
    const [color, setColor] = useState(defaultValues?.color ?? '#ff00ff')
    const [state, setState] = useState(defaultValues?.state ?? 'avaliable')

    useEffect(() => {
        setValue('image', image ?? '')
        setValue('color', color)
        setValue('state', state)
    }, [image, color, state])

    return (
        <View>
            <View style={styles.form}>
                <View>
                    <ImagePicker style={styles.imagePicker} setImage={image => setImage(image ?? '')}>
                        <Image source={image} style={styles.image} />
                        {(image === '') && <Text style={styles.imageText}>Ajouter une image</Text>}
                    </ImagePicker>
                    {errors.image && <TextError>{errors.image?.message}</TextError>}
                </View>

                <InputForm
                    control={control}
                    name="name"
                    label='Nom du produit'
                    placeholder='Ex: Pain'
                    defaultValue={defaultValues?.name}
                />

                <InputForm
                    control={control}
                    name="description"
                    label='Description'
                    placeholder='Optional'
                    defaultValue={defaultValues?.description}
                />

                <InputForm
                    control={control}
                    name="price"
                    label='Prix du produit (XAF)'
                    placeholder='Ex: 100'
                    defaultValue={defaultValues?.price}
                />

                <View>
                    <ColorPicker 
                        text="Choisir une couleur de fond" 
                        onColorChanged={(color) => setColor(color)} 
                        color={color}
                    />
                    <Text style={{marginTop: 10, fontSize: 17}}>Etat du produit</Text>
                    <Picker selectedValue={state} onValueChange={(value: string) => setState(value)}>
                        <Picker.Item label="Disponible" value="avaliable" />
                        <Picker.Item label="Indisponible" value="unavaliable" />
                    </Picker>
                    {errors.state && <TextError>{errors.state?.message}</TextError>}
                </View>

                <View style={styles.actions}>
                    <Button
                        title={actionButton}
                        onPress={handleSubmit((data) => onValidate(data as Product))}
                        icon={actionIcon}
                    />
                    {cancelButton}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        gap: 10
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10
    },
    imagePicker: {
        height: 200,
        backgroundColor: '#cfcfcf',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    image: {
        width: '95%',
        height: '95%',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    imageText: {
        fontSize: 20,
        color: '#000',
        position: 'absolute',
    }
})