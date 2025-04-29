import { useResumeProducts } from "@/hooks/useResumeProducts";
import { useStore } from "@/hooks/useStore";
import { Product } from "@/types";
import { createContext, PropsWithChildren, useContext } from "react";

export type DeliveryProductsContextType<T extends Product> = {
    products: T[],
    totalSales: number,
    estimatedTotal: number,
}

const DeliveryProductsContext = createContext<DeliveryProductsContextType<any>>({
    products: [],
    totalSales: 0,
    estimatedTotal: 0
})

export const DeliveryProductsProvider = ({children}: PropsWithChildren) => {

    const { products: db_products, sells: sales, deliveries } = useStore()
    const { products, totalSales, estimatedTotal } = useResumeProducts({ sales, deliveries, products: db_products})
    
    return (
        <DeliveryProductsContext.Provider value={{products, totalSales, estimatedTotal}}>
            {children}
        </DeliveryProductsContext.Provider>
    )
}

export const useDeliveryProductContext = () => {
    return useContext(DeliveryProductsContext)
}