import { SQLiteDatabase } from "expo-sqlite";
import { ProductSeeder } from "./product.seeder";
import { DeliveriesSeeder } from "./deliveries.seeder";
import { SellSeeder } from "./sells.seeders";

export class DatabaseSeeder
{
    static async run(db: SQLiteDatabase)
    {
        await ProductSeeder.run(db)
        await DeliveriesSeeder.run(db)
        await SellSeeder.run(db)
    }
}