import { useEffect } from "react";
import useProductsActions from "@/hooks/actions/useProductsActions";
import useBootstrapDatabase from "./useBootstrapDatabase";
import useDetectFirstRun from "@/hooks/useDetectFirstRun";

export default function useBootstrapApplication()
{
    const {isFirstRun, loading, mutateFirstRun} = useDetectFirstRun()
    const { setup } =  useBootstrapDatabase()
    const { fetchProducts } = useProductsActions()

    useEffect(() => {
        if(!loading) {
            setup(isFirstRun).then(async () =>{
                await fetchProducts()
                await mutateFirstRun()
            })
        }
    }, [loading])

}