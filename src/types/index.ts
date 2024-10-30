import { InferType } from 'yup'
import { deliverySchema, productSchema, sellSchema, userSchema } from "./schemas"

export type User = InferType<typeof userSchema> & {
    image: string,
}

export type Product = InferType<typeof productSchema> & {
    timestamp: number
}

export type Delivery = InferType<typeof deliverySchema> & {
    timestamp: number,
}

export type DeliveryProduct = Product & {
    quantity: number,
    product_id: string,
    delivery_at: string
}

export type Sell = InferType<typeof sellSchema> & {
    timestamp: number,
}

export type SellProduct = Product & {
    quantity: number,
    product_id: string,
    sell_at: string
}

export type Tag = {
    text: string,
    value: string
}