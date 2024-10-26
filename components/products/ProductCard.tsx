import { Product } from "@/types"
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import UserAvatar from "../UserAvatar"
import Tag from "../typography/Tag"

export type ProductCardProps = TouchableOpacityProps & {
    product: Product
}

export default function ProductCard({product, ...props}: ProductCardProps)
{
    const color = product.color ?? '#f0f'
    const state = String(product.state?.at(0)?.toLocaleUpperCase()) + product.state?.slice(1)

    return (
        <TouchableOpacity style={[styles.container, {borderColor: color}]} activeOpacity={0.7} {...props}>
            <View style={styles.content}>
                <UserAvatar uri={product.image} radius={10} size={100} />
                <View style={{
                    gap: 5
                }}>
                    <Text style={{fontSize: 15}}>
                        <Text style={{fontWeight: 'bold'}}>Nom :</Text> {product.name}
                    </Text>
                    <Text style={{fontSize: 15}}>
                        <Text style={{fontWeight: 'bold'}}>Prix  :</Text> {product.price} XAF
                    </Text>
                    <Tag 
                        tag={state} 
                        bgColor={product.state === 'avaliable' ? 'lightgreen' : '#ff0000'}
                        color={product.state === 'avaliable' ? '#000' : '#fff'}
                    />
                </View>
            </View>
            <View style={[styles.background, {backgroundColor: color}]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        position: 'relative',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    background: {
        opacity: 0.1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1
    }
})