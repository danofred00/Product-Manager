import { Sale, SaleProduct } from "@/types";
import { SQLiteDatabase } from "expo-sqlite";

export class SaleRepository
{
    private static db: SQLiteDatabase

    static async init(db: SQLiteDatabase)
    {
        this.db = db
        await this.createTable(db)
    }

    static async getAll()
    {
        const deliveries: SaleProduct[] = []

        const rows = await this.db.getAllAsync(
            'SELECT * FROM sales INNER JOIN products ON sales.product_id = products.id'
        )
        
        for (const row of rows as SaleProduct[])
        {
            deliveries.push({
                ...row,
                is_rest: !!row.is_rest,
                product_id: String(row.product_id),
                id: String(row.id),
                description: row.description ?? undefined
            })
        }

        return deliveries
    }

    static async get(id: string): Promise<SaleProduct|null>
    {
        return await this.db.getFirstAsync<SaleProduct>(
            'SELECT * FROM sales INNER JOIN products ON sales.product_id = products.id WHERE sales.id = ?', [id]
        )

    }

    static async create(sale: Sale): Promise<SaleProduct>
    {
        const { product_id, quantity, timestamp, sale_at, is_rest } = sale

        const result = await this.db.runAsync(
            'INSERT INTO sales (product_id, quantity, timestamp, sale_at, is_rest) VALUES (?, ?, ?, ?, ?)',
            [product_id, quantity, timestamp, sale_at ?? '', is_rest]
        )
        const data = await this.get(String(result.lastInsertRowId)) 
        if(data !== null) {
            data.id = String(data?.id)
        }
        return data as SaleProduct
    }

    static async update(id:string, sale: Sale): Promise<Sale>
    {
        const { product_id, quantity, timestamp, sale_at, is_rest } = sale

        await this.db.runAsync(
            'UPDATE sales SET product_id = ?, quantity = ?, timestamp = ?, sale_at = ?, is_rest = ? WHERE id = ?',
            [product_id, quantity, timestamp, sale_at ?? '', is_rest, id]
        )

        return sale
    }

    static async delete(id: string): Promise<void>
    {
        return this.db.execAsync(`DELETE FROM sales WHERE id = ${id}`)
    }

    static async createTable(db: SQLiteDatabase)
    {
        console.log('[DBService::createTables] Creating sales table')

        const query = `
            CREATE TABLE IF NOT EXISTS sales(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id TEXT NOT NULL,
                quantity INTEGER DEFAULT 0,
                sale_at TEXT DEFAULT '',
                is_rest INTEGER DEFAULT 0,
                timestamp INTEGER DEFAULT 0,
                FOREIGN KEY(product_id) REFERENCES products(id)
            )
        `
        await db.execAsync(query)

        console.log('[DBService::createTables] Done.')
    }
} 