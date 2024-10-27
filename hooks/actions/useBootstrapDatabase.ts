import { DBService } from "@/services/database/database.service"
import { DatabaseRepository } from "@/services/database/repositories/database.repository"
import { DatabaseSeeder } from "@/services/database/seeders/database.seeder"
import { useSQLiteContext } from "expo-sqlite"
import { useCallback, useEffect, useState } from "react"


export default function useBootstrapDatabase()
{
    const db = useSQLiteContext()
    const [loading, setLoading] = useState(true)

    const setup = useCallback(async () => {
        console.log('[useBootstrapDatabase] Bootstraping database')

        await DBService.dropTables(db)

        await DatabaseRepository.init(db)
        await DBService.createTables(db)

        await DatabaseSeeder.run(db)
    }, [])

    useEffect(() => {
        setup().then(() => {
            console.log('[useBootstrapDatabase] Done.')
            setLoading(false)
        })
    }, [setup])

    return {
        db,
        loading
    }
}