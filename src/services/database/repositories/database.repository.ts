import { SQLiteDatabase } from "expo-sqlite";
import { ProductRepository } from "./products.repository";
import { DeliveryRepository } from "./deliveries.repository";
import { SellRepository } from "./sells.repository";

export class DatabaseRepository
{
    static async init(db: SQLiteDatabase)
    {
        await ProductRepository.init(db)
        await DeliveryRepository.init(db)
        await SellRepository.init(db)
    }
}