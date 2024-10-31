import { ProductStatsService } from "@/services/productstats.service";
import { Delivery, Product, ProductState, Sell } from "@/types";
import { useMemo } from "react";

export type ResumeProductsOptions = {
    products: Product[],
    deliveries: Delivery[],
    sales: Sell[]
}

export function useResumeProducts(options: ResumeProductsOptions): Product[]
{
    const {products, deliveries, sales} = options

    const resumed = useMemo<Product[]>(() => {
        const result = []
        const statService = new ProductStatsService()

        for(const product of products.filter((p) => p.state === ProductState.AVALIABLE)) {

            const received = statService.calculateReceived(product.id, deliveries)
            const sale = statService.calculateSale(product.id, sales)
            const inStock = received - sale

            result.push({...product, inStock, sale, received})
        }

        return result

    }, [products, deliveries, sales])

    return resumed
}