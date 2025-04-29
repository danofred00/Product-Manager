import { useDispatch } from "react-redux"
import { useStore } from "../useStore"
import { Sale, SaleProduct } from "@/types"
import { addSell as add, removeSell as remove, setSells as set } from "@/features/store/sells.store"
import { SellService } from "@/services/sells.service"

export default function useSellActions()
{
    const { sells } = useStore()
    const dispatch = useDispatch()

    const setSells = (sells: SaleProduct[]) => {
        dispatch(set(sells))
    }

    const fetchAll = () => {
        SellService.getAll().then(data => {
            setSells(data)
        })
    }

    const addSell = async (sell: Sale) => {
        SellService.create(sell).then((data) => {
            dispatch(add(data))
        })
    }

    const removeSell = async (id: string) => {
        SellService.delete(id).then(() => {
            dispatch(remove(id))
        })
    }

    const updateSell = async (id: string, sell: Sale) => {
        SellService.update(id, sell).then(() => {
            fetchAll()
        })
    }

    return {
        sells: sells as SaleProduct[],
        addSell,
        fetchSells: fetchAll,
        removeSell,
        updateSell
    }
}