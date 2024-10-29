import { SQLiteDatabase } from "expo-sqlite";
import { DeliveryRepository } from "../repositories/deliveries.repository";
import { Delivery } from "@/types";

const deliveries: Delivery[] = [
    {
        id: '1',
        product_id: '1',
        quantity: '10',
        timestamp: Date.now(),
        delivery_at: '10h30'
    },
    {
        id: '2',
        product_id: '2',
        quantity: '5',
        timestamp: Date.now(),
        delivery_at: '10h30'
    },
    {
        id: '3',
        product_id: '3',
        quantity: '2',
        timestamp: Date.now(),
        delivery_at: '10h30'
    }
]

export class DeliveriesSeeder
{
    static async run(db: SQLiteDatabase)
    {
        for (const delivery of deliveries)
        {
            DeliveryRepository.create(delivery)
        }

        console.log('[DeliveriesSeeder::run] Deliveries seeded')
    }
}