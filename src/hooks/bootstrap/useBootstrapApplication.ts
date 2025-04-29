import { useEffect } from "react";
import useProductsActions from "@/hooks/actions/useProductsActions";
import useBootstrapDatabase from "./useBootstrapDatabase";
import useDetectFirstRun from "@/hooks/useDetectFirstRun";
import useDeliveriesActions from "../actions/useDeliveriesActions";
import useSellActions from "../actions/useSellActions";

export default function useBootstrapApplication()
{
    const {isFirstRun, loading, mutateFirstRun} = useDetectFirstRun()
    const { setup } =  useBootstrapDatabase()
    const { fetchProducts } = useProductsActions()
    const { fetchDeliveries } = useDeliveriesActions()
    const { fetchSells } = useSellActions()

    useEffect(() => {
        if(!loading) {
            setup(isFirstRun).then(async () =>{
                await fetchProducts()
                await fetchDeliveries()
                await fetchSells()
                await mutateFirstRun()
            })
        }
    }, [loading])

}