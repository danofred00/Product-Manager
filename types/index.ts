import { InferType } from 'yup'
import { deliverySchema, productSchema, userSchema } from "./schemas"

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

export type Tag = {
    text: string,
    value: string
}