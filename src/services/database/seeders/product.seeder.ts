import { Product, ProductState } from "@/types";
import { SQLiteDatabase } from "expo-sqlite";
import { ProductRepository } from "../repositories/products.repository";

export class ProductSeeder
{
    static async run(db: SQLiteDatabase)
    {
        console.log('[ProductSeeder::run] Seeding products table')

        const response = await fetch(process.env.EXPO_PUBLIC_UGOEAT_API + '/api/v1/products?limit=10')
        const json = await response.json()
        const products = Array.from(json.data).map((p: any) => {
            return {
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image_url,
                description: p.description,
                color: '#ff00ff',
                state: p.is_active ? ProductState.AVALIABLE : ProductState.UNAVALIABLE,
                timestamp: (new Date(p.created_at)).getMilliseconds()
            }
        }) as Product[]

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