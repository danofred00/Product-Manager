import { sum } from "@/lib/utils";
import { Delivery, IdType, Sale } from "@/types";

export class ProductStatsService
{

    calculateReceived(productId: IdType, deliveries: Delivery[]): number
    {
        const productDeliveries = deliveries.filter(d => d.product_id === productId).map( d => parseInt(d.quantity))
        return sum(productDeliveries)
    }

    calculateSale(productId: IdType, sales: Sale[]): number 
    {
        const productDeliveries = sales.filter(s => s.product_id === productId).map(s => {
            if(s.is_rest) {
                return 0;
            }
            return parseInt(s.quantity)
        })
        return sum(productDeliveries)
    }

    calculateRest(productId: IdType, sales: Sale[]): number 
    {
        const productDeliveries = sales.filter(s => s.product_id === productId).map(s => {
            if(!s.is_rest) {
                return 0;
            }
            return parseInt(s.quantity)
        })
        return sum(productDeliveries)
    }

    calculateInStock(productId: IdType, deliveries: Delivery[], sales: Sale[]): number
    {
        return this.calculateReceived(productId, deliveries) - this.calculateSale(productId, sales)
    }
}