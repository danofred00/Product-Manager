import { Sell, SellProduct } from "@/types";
import { SQLiteDatabase } from "expo-sqlite";

export class SellRepository
{
    private static db: SQLiteDatabase

    static async init(db: SQLiteDatabase)
    {
        this.db = db
        await this.createTable(db)
    }

    static async getAll()
    {
        const deliveries: SellProduct[] = []

        const rows = await this.db.getAllAsync(
            'SELECT * FROM sells INNER JOIN products ON sells.product_id = products.id'
        )

        for (const row of rows as SellProduct[])
        {
            deliveries.push({
                ...row,
                product_id: String(row.product_id),
                id: String(row.id),
                description: row.description ?? undefined
            })
        }

        return deliveries
    }

    static async get(id: string): Promise<SellProduct|null>
    {
        return await this.db.getFirstAsync<SellProduct>(
            'SELECT * FROM sells INNER JOIN products ON sells.product_id = products.id WHERE sells.id = ?', [id]
        )

    }

    static async create(sell: Sell): Promise<SellProduct>
    {
        const { product_id, quantity, timestamp, sell_at } = sell

        const result = await this.db.runAsync(
            'INSERT INTO sells (product_id, quantity, timestamp, sell_at) VALUES (?, ?, ?, ?)',
            [product_id, quantity, timestamp, sell_at ?? '']
        )
        const data = await this.get(String(result.lastInsertRowId)) 
        if(data !== null) {
            data.id = String(data?.id)
        }
        return data as SellProduct
    }

    static async update(id:string, sell: Sell): Promise<Sell>
    {
        const { product_id, quantity, timestamp, sell_at } = sell

        await this.db.runAsync(
            'UPDATE sells SET product_id = ?, quantity = ?, timestamp = ?, sell_at = ? WHERE id = ?',
            [product_id, quantity, timestamp, sell_at ?? '', id]
        )

        return sell
    }

    static async delete(id: string): Promise<void>
    {
        return this.db.execAsync(`DELETE FROM sells WHERE id = ${id}`)
    }

    static async createTable(db: SQLiteDatabase)
    {
        console.log('[DBService::createTables] Creating sells table')

        const query = `
            CREATE TABLE IF NOT EXISTS sells(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id TEXT NOT NULL,
                quantity INTEGER DEFAULT 0,
                sell_at TEXT DEFAULT '',
                timestamp INTEGER DEFAULT 0,
                FOREIGN KEY(product_id) REFERENCES products(id)
            )
        `
        await db.execAsync(query)

        console.log('[DBService::createTables] Done.')
    }
} 