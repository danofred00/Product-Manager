import { SQLiteDatabase } from "expo-sqlite";
import { ProductSeeder } from "./product.seeder";

export class DatabaseSeeder
{
    static async run(db: SQLiteDatabase)
    {
        await ProductSeeder.run(db)
    }
}