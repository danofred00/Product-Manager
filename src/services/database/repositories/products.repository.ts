import { kDefaultProductColor } from "@/constants";
import { Product } from "@/types";
import { SQLiteDatabase } from "expo-sqlite";

export class ProductRepository
{
    private static db: SQLiteDatabase

    public static async init(db: SQLiteDatabase)
    {
        this.db = db
        await this.createTable(db)

        console.log('[ProductRepository::init] Done.')
    }

    static async getAll(): Promise<Product[]>
    {
        const products: Product[] = []
        
        console.log('[ProductRepository::getAll] Quering all products')
        
        const rows = await this.db.getAllAsync('SELECT * FROM products')

        for(const row of rows as Product[])
        {
            products.push({
                id: String(row.id),
                name: row.name,
                description: row.description ?? '',
                price: String(row.price),
                image: row.image,
                color: row.color,
                state: row.state,
                timestamp: row.timestamp
            })
        }

        return products
    }

    static async get(id: string): Promise<Product|null>
    {
        const query = `SELECT * FROM products WHERE id = ${id};`

        const product = this.db.getFirstAsync<Product>(query)

        return product
    }

    static async create(product: Product): Promise<Product>
    {
        const query = `
            INSERT INTO products(name, description, price, image, color, state, timestamp)
            VALUES($name, $description, $price, $image, $color, $state, $timestamp)
        `
        const stmt = await this.db.prepareAsync(query)

        try {
            const result = await stmt.executeAsync({
                $name: product.name,
                $price: product.price,
                $state: product.state ?? 'avaliable',
                $description: product.description ?? null,
                $timestamp: Date.now(),
                $image: product.image,
                $color: product.color ?? kDefaultProductColor
            })
            product.id = String(result.lastInsertRowId)
        } finally {
            await stmt.finalizeAsync()
        }

        return product
    }

    static async delete(id: string|number): Promise<boolean>
    {
        await this.db.execAsync(`DELETE FROM products WHERE id = ${id};`)

        return true
    }

    static async update(id: string, data: Product): Promise<Product>
    {
        const query = `
            UPDATE products
            SET name = $name, description = $description, price = $price, image = $image, color = $color, state = $state, timestamp = $timestamp
            WHERE id = $id
        `
        const stmt = await this.db.prepareAsync(query)

        try {
            await stmt.executeAsync({
                $id: id,
                $name: data.name,
                $price: data.price,
                $state: data.state ?? 'avaliable',
                $description: data.description ?? null,
                $timestamp: Date.now(),
                $image: data.image,
                $color: data.color ?? kDefaultProductColor
            })
        } finally {
            await stmt.finalizeAsync()
        }

        return data
    }

    private static async createTable(db: SQLiteDatabase)
    {
        console.log('[ProductRepository::createTable] Creating products table')

        const query = `
            CREATE TABLE IF NOT EXISTS products(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT DEFAULT '',
                price INTEGER NOT NULL,
                image TEXT,
                color TEXT DEFAULT '${kDefaultProductColor}',
                state TEXT DEFAULT 'avaliable',
                timestamp INTEGER DEFAULT 0
            )
        `
        await db.execAsync(query)

        console.log('[ProductRepository::createTable] Done.')
    }
}