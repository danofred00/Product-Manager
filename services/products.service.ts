import { DeliveryProduct, Product } from "@/types";
import { ProductRepository } from "./database/repositories/products.repository";

export class ProductService
{
    static async getDeliveryProducts(): Promise<DeliveryProduct[]>
    {
        return []
    }

    static async getProducts(): Promise<Product[]>
    {
        return ProductRepository.getAll()
    }

    static async get(id: string): Promise<Product|null>
    {
        return ProductRepository.get(id)    
    }

    static async addProduct(product: Product): Promise<Product>
    {
        return ProductRepository.create(product)
    }

    
    static async removeProduct(id: string|number): Promise<boolean>
    {
        return ProductRepository.delete(id)
    }

    static async updateProduct(id: string, data: Product): Promise<Product>
    {
        return ProductRepository.update(id, data)
    }
}