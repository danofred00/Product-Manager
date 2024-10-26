import { useEffect } from "react";
import useProductsActions from "./useProductsActions";

export default function useBootstrapApplication()
{
    const { fetchProducts } = useProductsActions()

    useEffect(() => {
        fetchProducts()
    }, [])
}