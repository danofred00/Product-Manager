import { SQLiteDatabase } from "expo-sqlite";
import { ProductRepository } from "./products.repository";

export class DatabaseRepository
{
    static async init(db: SQLiteDatabase)
    {
        await ProductRepository.init(db)
    }
}