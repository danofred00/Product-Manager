import { InferType } from 'yup'
import { deliverySchema, productSchema, sellSchema, userSchema } from "./schemas"

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

export type Sell = InferType<typeof sellSchema> & {
    timestamp: number,
}

export type SellProduct = Product & {
    quantity: number,
    product_id: IdType,
    sell_at: string
}

export type Tag = {
    text: string,
    value: string
}