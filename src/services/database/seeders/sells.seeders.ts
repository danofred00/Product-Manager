import { SQLiteDatabase } from "expo-sqlite";
import { SaleRepository } from "../repositories/sells.repository";
import { Sale } from "@/types";

const sells: Sale[] = [
    {
      id: '1',
      timestamp: Date.now() - 1000,
      product_id: '1',
      quantity: '1',
      sale_at: '10h',
      is_rest: false
    },
    {
      id: '2',
      timestamp: Date.now() - 100,
      product_id: '4',
      quantity: '1',
      sale_at: '12h25',
      is_rest: false
    },
    {
        id: '3',
        timestamp: Date.now(),
        product_id: '3',
        quantity: '1',
        sale_at: '15h',
        is_rest: true
      },
  ]

export class SellSeeder
{
    static async run(db: SQLiteDatabase)
    {
        for (const sell of sells)
        {
            SaleRepository.create(sell)
        }
        console.log('[SellSeeder::run] Sells seeded')
    }
}