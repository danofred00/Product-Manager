import { ProductStatsService } from "@/services/productstats.service";
import { Delivery, Product, ProductState, Sale } from "@/types";
import { useMemo, useState } from "react";

export type ResumeProductsOptions = {
    products: Product[],
    deliveries: Delivery[],
    sales: Sale[]
}

export function useResumeProducts(options: ResumeProductsOptions)
{
    const {products, deliveries, sales} = options

    const {result, totalSales, estimatedTotal} = useMemo(() => {
        const result = []
        let totalSales = 0
        let estimatedTotal = 0
        const statService = new ProductStatsService()

        for(const product of products.filter((p) => p.state === ProductState.AVALIABLE)) {

            const received = statService.calculateReceived(product.id, deliveries)
            let sale = statService.calculateSale(product.id, sales)
            const rest  = statService.calculateRest(product.id, sales)

            // update the sale values
            if(rest) {
                sale = received - rest
            }
            // calculate in stock
            const inStock = received - sale
            // add a product
            result.push({...product, inStock, sale, received})
            // update sales amount
            totalSales += sale
            estimatedTotal += (sale * parseInt(product.price))
        }

        return {
            result, estimatedTotal, totalSales
        }

    }, [products, deliveries, sales])

    return {
        products: result,
        totalSales,
        estimatedTotal
    }
}