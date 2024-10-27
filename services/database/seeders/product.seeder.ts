import { Product } from "@/types";
import { SQLiteDatabase } from "expo-sqlite";
import { ProductRepository } from "../repositories/products.repository";

const products: Product[] = [
    {
        id: '1',
        name: 'Pain au lait',
        price: '100',
        state: 'avaliable',
        timestamp: Date.now() - 1000,
        image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
        color: '#ff00ff'
    },
    {
        id: '2',
        name: 'Boule de pain',
        price: '150',
        state: 'avaliable',
        timestamp: Date.now(),
        image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
        color: '#ff00ff'
    },
    {
        id: '3',
        name: 'Pain au lait',
        price: '50',
        state: 'avaliable',
        timestamp: Date.now() - 10,
        image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
        color: '#ff00ff'
    },
    {
        id: '4',
        name: 'Pain ordinaire',
        price: '100',
        state: 'avaliable',
        timestamp: Date.now() + 123,
        image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
        color: '#ff00ff'
    },
    {
        id: '5',
        name: 'Pain ordinaire',
        price: '150',
        state: 'avaliable',
        timestamp: Date.now() - 523,
        image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
        color: '#ff00ff'
    },
    {
        id: '6',
        name: 'Pain ordinaire',
        price: '50',
        state: 'avaliable',
        timestamp: Date.now() - 100,
        image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
        color: '#ff00ff'
    }
]

export class ProductSeeder
{
    static async run(db: SQLiteDatabase)
    {
        console.log('[ProductSeeder::run] Seeding products table')

        try {
            for (const product of products)
            {
                ProductRepository.create(product)
            }
        } catch (error) {
            console.error('[ProductSeeder::run] Error seeding products table', error)
        }

        console.log('[ProductSeeder::run] Done.')
    }
}