
import { SQLiteDatabase} from 'expo-sqlite'

export class DBService
{

    static async createTables(db: SQLiteDatabase) {}
    
    static async dropTables(db: SQLiteDatabase)
    {
        console.log('[DBService::dropTables] Dropping tables')

        const tables = [
            'products', 
            'deliveries', 
            'sales'
        ]

        const query = `
            ${tables.map(table => `DROP TABLE IF EXISTS ${table};`).join('\n')}
        `
        await db.execAsync(query)

        console.log('[DBService::dropTables] Done.')
    }
}