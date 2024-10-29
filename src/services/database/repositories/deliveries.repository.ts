import { Delivery, DeliveryProduct } from "@/types";
import { SQLiteDatabase } from "expo-sqlite";

export class DeliveryRepository
{
    private static db: SQLiteDatabase

    static async init(db: SQLiteDatabase)
    {
        this.db = db
        await this.createTable(db)
    }

    static async getAll()
    {
        const deliveries: DeliveryProduct[] = []

        const rows = await this.db.getAllAsync(
            'SELECT * FROM deliveries INNER JOIN products ON deliveries.product_id = products.id'
        )

        for (const row of rows as DeliveryProduct[])
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

    static async get(id: string): Promise<DeliveryProduct|null>
    {
        return await this.db.getFirstAsync<DeliveryProduct>(
            'SELECT * FROM deliveries INNER JOIN products ON deliveries.product_id = products.id WHERE deliveries.id = ?', [id]
        )

    }

    static async create(delivery: Delivery): Promise<DeliveryProduct>
    {
        const { product_id, quantity, timestamp, delivery_at } = delivery

        const result = await this.db.runAsync(
            'INSERT INTO deliveries (product_id, quantity, timestamp, delivery_at) VALUES (?, ?, ?, ?)',
            [product_id, quantity, timestamp, delivery_at]
        )
        const data = await this.get(String(result.lastInsertRowId)) 
        if(data !== null) {
            data.id = String(data?.id)
        }
        return data as DeliveryProduct
    }

    static async update(id:string, delivery: Delivery): Promise<Delivery>
    {
        const { product_id, quantity, timestamp, delivery_at } = delivery

        await this.db.runAsync(
            'UPDATE deliveries SET product_id = ?, quantity = ?, timestamp = ?, delivery_at = ? WHERE id = ?',
            [product_id, quantity, timestamp, delivery_at, id]
        )

        return delivery
    }

    static async delete(id: string): Promise<void>
    {
        return this.db.execAsync(`DELETE FROM deliveries WHERE id = ${id}`)
    }

    static async createTable(db: SQLiteDatabase)
    {
        console.log('[DBService::createTables] Creating deliveries table')

        const query = `
            CREATE TABLE IF NOT EXISTS deliveries(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id TEXT NOT NULL,
                quantity INTEGER DEFAULT 0,
                delivery_at TEXT NOT NULL,
                timestamp INTEGER DEFAULT 0,
                FOREIGN KEY(product_id) REFERENCES products(id)
            )
        `
        await db.execAsync(query)

        console.log('[DBService::createTables] Done.')
    }
} 