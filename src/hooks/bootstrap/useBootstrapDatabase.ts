import { kDebug } from "@/constants"
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

        await DatabaseRepository.init(db)

        if(isFirstRun && kDebug){
            await DatabaseSeeder.run(db)
        } 
        
    }, [])

    const uninstall = useCallback(async () => {
        console.log("[useBootstrapDatabase::uninstall] Dropping tables")

        await DBService.dropTables(db)
    }, [])

    return {
        db,
        setup,
        uninstall
    }
}