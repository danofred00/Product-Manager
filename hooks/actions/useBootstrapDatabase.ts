import { DBService } from "@/services/database/database.service"
import { DatabaseRepository } from "@/services/database/repositories/database.repository"
import { DatabaseSeeder } from "@/services/database/seeders/database.seeder"
import { useSQLiteContext } from "expo-sqlite"
import { useCallback } from "react"

export default function useBootstrapDatabase()
{
    const db = useSQLiteContext()

    const setup = useCallback(async (isFirstRun: boolean) => {
        console.log('[useBootstrapDatabase] Bootstraping database')

        if(isFirstRun) {
            await DBService.dropTables(db)
        }        
        await DatabaseRepository.init(db)
        await DBService.createTables(db)

        if(isFirstRun) {
            await DatabaseSeeder.run(db)
        }
    }, [])

    return {
        db,
        setup
    }
}