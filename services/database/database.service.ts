
import { SQLiteDatabase} from 'expo-sqlite'

export class DBService
{

    static async createTables(db: SQLiteDatabase)
    {
        await this.createUserTable(db)
        await this.createDeliveriesTable(db)
        await this.createBillsTable(db)
        await this.createSellsTable(db)
    }


    private static async createUserTable(db: SQLiteDatabase)
    {
        console.log('[DBService::createTables] Creating user table')

        const query = `
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstname TEXT NOT NULL,
                lastname TEXT,
                description TEXT,
                image TEXT
            );
        `
        await db.execAsync(query)

        console.log('[DBService::createTables] Done.')
    }

    private static async createDeliveriesTable(db: SQLiteDatabase)
    {
        console.log('[DBService::createTables] Creating deliveries table')

        const query = `
            CREATE TABLE IF NOT EXISTS deliveries(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id TEXT NOT NULL,
                quantity INTEGER DEFAULT 0,
                timestamp INTEGER NOT NULL,
                FOREIGN KEY(product_id) REFERENCES products(id)
            )
        `
        await db.execAsync(query)

        console.log('[DBService::createTables] Done.')
    }

    private static async createBillsTable(db: SQLiteDatabase)
    {
        console.log('[DBService::createTables] Creating bills table')

        const billsQuery = `
            CREATE TABLE IF NOT EXISTS bills(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER DEFAULT 0
            )
        `

        const billsProductQuery = `
            CREATE TABLE IF NOT EXISTS bills_products(
                bill_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER DEFAULT 0,
                FOREIGN KEY(bill_id) REFERENCES bills(id),
                FOREIGN KEY(product_id) REFERENCES products(id)
            )
        `

        await db.execAsync(billsQuery)

        console.log('[DBService::createTables] Creating bills_products table')
        await db.execAsync(billsProductQuery)

        console.log('[DBService::createTables] Done.')
    }

    private static async createSellsTable(db: SQLiteDatabase)
    {
        console.log('[DBService::createTables] Creating sells table')

        const sellsQuery = `
            CREATE TABLE IF NOT EXISTS sells(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER DEFAULT 0
            )
        `

        const sellsProductsQuery = `
            CREATE TABLE IF NOT EXISTS sells_products(
                sell_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER DEFAULT 0,
                FOREIGN KEY(sell_id) REFERENCES sells(id),
                FOREIGN KEY(product_id) REFERENCES products(id)
            )
        `

        await db.execAsync(sellsQuery)

        console.log('[DBService::createTables] Creating sells_products table')
        await db.execAsync(sellsProductsQuery)

        console.log('[DBService::createTables] Done.')
    }

    static async dropTables(db: SQLiteDatabase)
    {
        console.log('[DBService::dropTables] Dropping tables')

        const tables = [
            'sells_products', 
            'bills_products', 
            'products', 
            'users', 
            'deliveries', 
            'bills',
            'sells'
        ]

        const query = `
            ${tables.map(table => `DROP TABLE IF EXISTS ${table};`).join('\n')}
        `
        await db.execAsync(query)

        console.log('[DBService::dropTables] Done.')
    }
}