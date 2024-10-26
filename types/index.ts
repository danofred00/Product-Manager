import { InferType } from 'yup'
import { productSchema, userSchema } from "./schemas"

export type User = InferType<typeof userSchema> & {
    image: string,
}

export type Product = InferType<typeof productSchema> & {
    timestamp: number
}

export type DeliveryProduct = Product & {
    quantity: number,
    timestamp: number
}