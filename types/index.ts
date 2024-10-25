
export type Product = {
    id: string | number,
    name: string,
    description?: string,
    color?: string
    price: number,
    state: 'available' | 'unavailable',
    image: string
}

export type DeliveryProduct = Product & {
    quantity: number,
    timestamp: number
}