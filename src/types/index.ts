import { InferType } from 'yup'
import { deliverySchema, productSchema, saleSchema, userSchema } from "./schemas"

export type IdType = number|string|undefined

export enum ProductState {
    AVALIABLE = "avaliable",
    UNAVALIABLE = "unavaliable"
}

export type User = InferType<typeof userSchema> & {
    image: string,
}

export type Product = InferType<typeof productSchema> & {
    timestamp: number,
    inStock?: number,
    sale?: number,
    received?: number
}

export type Delivery = InferType<typeof deliverySchema> & {
    timestamp: number,
}

export type DeliveryProduct = Product & {
    quantity: number,
    product_id: IdType,
    delivery_at: string
}

export type Sale = InferType<typeof saleSchema> & {
    timestamp: number,
}

export type SaleProduct = Product & {
    quantity: number,
    product_id: IdType,
    sale_at: string,
    is_rest?: boolean
}

export type Tag = {
    text: string,
    value: string
}