import { groupBy } from "@/lib/utils";
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
        const selector = (item: Delivery|Sale) => item.product_id
        const groupedDeliveries = groupBy(deliveries, selector)
        const groupedSales = groupBy(sales, selector)
        

        for(const {id, ...product} of products.filter((p) => p.state === ProductState.AVALIABLE)) {

            let sale = 0

            const deliveries = groupedDeliveries[id ?? ''] ?? []
            const allSales = groupBy(groupedSales[id ?? ''] ?? [], item => item.is_rest ? 'rests': 'sales')
            const rests = allSales['rests'] ?? []
            const sales = allSales['sales'] ?? []
            
            const hasSales = sales.length > 0
            const hasRests = rests.length > 0

            const received = statService.calculateReceived(id, deliveries)

            // if the rest value is detected, use it received as sale if there's no sales
            if(hasRests) {
                const rest = statService.calculateRest(id, rests)
                if(!hasSales) { sale = received - rest } 
            } else if(hasSales) {
                sale = statService.calculateSale(id, sales)
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