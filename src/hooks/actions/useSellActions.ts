import { useDispatch } from "react-redux"
import { useStore } from "../useStore"
import { Sell, SellProduct } from "@/types"
import { addSell as add, removeSell as remove, setSells as set } from "@/features/store/sells.store"
import { SellService } from "@/services/sells.service"

export default function useSellActions()
{
    const { sells } = useStore()
    const dispatch = useDispatch()

    const setSells = (sells: SellProduct[]) => {
        dispatch(set(sells))
    }

    const fetchAll = () => {
        SellService.getAll().then(data => {
            setSells(data)
        })
    }

    const addSell = async (sell: Sell) => {
        SellService.create(sell).then((data) => {
            dispatch(add(data))
        })
    }

    const removeSell = async (id: string) => {
        SellService.delete(id).then(() => {
            dispatch(remove(id))
        })
    }

    const updateSell = async (id: string, sell: Sell) => {
        SellService.update(id, sell).then(() => {
            fetchAll()
        })
    }

    return {
        sells: sells as SellProduct[],
        addSell,
        fetchSells: fetchAll,
        removeSell,
        updateSell
    }
}