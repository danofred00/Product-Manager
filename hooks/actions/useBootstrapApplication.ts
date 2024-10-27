import { useEffect } from "react";
import useProductsActions from "./useProductsActions";
import useBootstrapDatabase from "./useBootstrapDatabase";
import useDetectFirstRun from "../useDetectFirstRun";

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