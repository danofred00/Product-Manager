import { sum } from "@/lib/utils";
import { Delivery, IdType, Sell } from "@/types";

export class ProductStatsService
{

    calculateReceived(productId: IdType, deliveries: Delivery[]): number
    {
        const productDeliveries = deliveries.filter(d => d.product_id === productId).map(d => parseInt(d.quantity))
        return sum(productDeliveries)
    }

    calculateSale(productId: IdType, sales: Sell[]): number 
    {
        const productDeliveries = sales.filter(s => s.product_id === productId).map(s => parseInt(s.quantity))
        return sum(productDeliveries)
    }

    calculateInStock(productId: IdType, deliveries: Delivery[], sales: Sell[]): number
    {
        return this.calculateReceived(productId, deliveries) - this.calculateSale(productId, sales)
    }
}