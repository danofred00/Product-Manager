import { SQLiteDatabase } from "expo-sqlite";
import { SellRepository } from "../repositories/sells.repository";
import { Sell } from "@/types";

const sells: Sell[] = [
    {
      id: '1',
      timestamp: Date.now() - 1000,
      product_id: '1',
      quantity: '25',
      sell_at: '10h',
    },
    {
      id: '2',
      timestamp: Date.now() - 100,
      product_id: '4',
      quantity: '50',
      sell_at: '12h25',
    },
    {
        id: '3',
        timestamp: Date.now(),
        product_id: '3',
        quantity: '2',
        sell_at: '15h',
      },
  ]

export class SellSeeder
{
    static async run(db: SQLiteDatabase)
    {
        for (const sell of sells)
        {
            SellRepository.create(sell)
        }

        console.log('[SellSeeder::run] Sells seeded')
    }
}