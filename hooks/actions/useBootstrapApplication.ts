import { useEffect } from "react";
import useProductsActions from "./useProductsActions";
import useBootstrapDatabase from "./useBootstrapDatabase";

export default function useBootstrapApplication()
{
    const { loading } =  useBootstrapDatabase()
    const { fetchProducts } = useProductsActions()

    useEffect(() => {
        if(!loading) {
            fetchProducts()
        }
    }, [loading])

}