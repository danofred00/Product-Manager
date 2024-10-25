import { DeliveryProduct } from "@/types";

export class ProductService
{
    static async getProducts(): Promise<DeliveryProduct[]>
    {
        return Promise.resolve([
            {
                id: 1,
                name: 'Pain au lait',
                price: 100,
                state: 'available',
                quantity: 100,
                timestamp: Date.now(),
                image: 'https://static.ugoeatonline.com/uploads/images/products/pain-lait.jpg'
            },
            {
                id: 2,
                name: 'Boule de pain',
                price: 150,
                state: 'available',
                quantity: 25,
                timestamp: Date.now(),
                image: 'https://static.ugoeatonline.com/uploads/images/products/pain-lait.jpg'
            },
            {
                id: 3,
                name: 'Pain au lait',
                price: 50,
                state: 'available',
                quantity: 100,
                timestamp: Date.now(),
                image: 'https://static.ugoeatonline.com/uploads/images/products/pain-lait.jpg'
            },
            {
                id: 4,
                name: 'Pain ordinaire',
                price: 100,
                state: 'available',
                quantity: 50,
                timestamp: Date.now(),
                image: 'https://static.ugoeatonline.com/uploads/images/products/pain-lait.jpg'
            },
            {
                id: 5,
                name: 'Pain ordinaire',
                price: 150,
                state: 'available',
                quantity: 100,
                timestamp: Date.now(),
                image: 'https://static.ugoeatonline.com/uploads/images/products/pain-lait.jpg'
            },
            {
                id: 6,
                name: 'Pain ordinaire',
                price: 50,
                state: 'available',
                quantity: 50,
                timestamp: Date.now(),
                image: 'https://static.ugoeatonline.com/uploads/images/products/pain-lait.jpg'
            }
        ])
    }
}