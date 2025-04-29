import { useDispatch } from "react-redux"
import { useStore } from "../useStore"
import { Delivery, DeliveryProduct } from "@/types"
import { addDelivery as add, removeDelivery as remove, setDeliveries as set } from "@/features/store/deliveries.store"
import { DeliveriesService } from "@/services/deliveries.service"

export default function useDeliveriesActions()
{
    const { deliveries } = useStore()
    const dispatch = useDispatch()

    const setDeliveries = (deliveries: DeliveryProduct[]) => {
        dispatch(set(deliveries))
    }

    const fetchAll = () => {
        DeliveriesService.getAll().then(data => {
            setDeliveries(data)
        })
    }

    const addDelivery = async (delivery: Delivery) => {
        DeliveriesService.create(delivery).then((data) => {
            dispatch(add(data))
        })
    }

    const removeDelivery = async (id: string) => {
        DeliveriesService.delete(id).then(() => {
            dispatch(remove(id))
        })
    }

    const updateDelivery = async (id: string, delivery: Delivery) => {
        DeliveriesService.update(id, delivery).then(() => {
            fetchAll()
        })
    }

    return {
        deliveries: deliveries as DeliveryProduct[],
        addDelivery,
        fetchDeliveries: fetchAll,
        removeDelivery,
        updateDelivery
    }
}