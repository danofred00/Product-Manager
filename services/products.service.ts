import { DeliveryProduct, Product } from "@/types";

export class ProductService
{
    static async getDeliveryProducts(): Promise<DeliveryProduct[]>
    {
        return Promise.resolve([
            {
            id: '1',
            name: 'Pain au lait',
            price: '100',
            state: 'avaliable',
            quantity: 100,
            timestamp: Date.now() - 1000,
            image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
            color: '#ff00ff'
            },
            {
            id: '2',
            name: 'Boule de pain',
            price: '150',
            state: 'avaliable',
            quantity: 25,
            timestamp: Date.now(),
            image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
            color: '#ff00ff'
            },
            {
            id: '3',
            name: 'Pain au lait',
            price: '50',
            state: 'avaliable',
            quantity: 100,
            timestamp: Date.now() - 10,
            image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
            color: '#ff00ff'
            },
            {
            id: '4',
            name: 'Pain ordinaire',
            price: '100',
            state: 'avaliable',
            quantity: 50,
            timestamp: Date.now() + 123,
            image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
            color: '#ff00ff'
            },
            {
            id: '5',
            name: 'Pain ordinaire',
            price: '150',
            state: 'avaliable',
            quantity: 100,
            timestamp: Date.now() - 523,
            image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
            color: '#ff00ff'
            },
            {
            id: '6',
            name: 'Pain ordinaire',
            price: '50',
            state: 'avaliable',
            quantity: 50,
            timestamp: Date.now() - 100,
            image: 'http://192.168.1.117:8000/uploads/images/products/pain-lait.jpg',
            color: '#ff00ff'
            }
        ])
    }

    static async getProducts(): Promise<Product[]>
    {
        return this.getDeliveryProducts()
    }

    static async get(id: string)
    {
        return (await this.getProducts()).filter(p => p.id === id).at(0)    
    }

    static async addProduct(product: Product): Promise<void>
    {
        console.log("[ProductService::addProduct] Adding product : ", product)
    }

    
    static async removeProduct(id: string|number): Promise<void>
    {
        console.log("[ProductService::removeProduct] Removing product ", id)
    }

    static async updateProduct(id: string, data: Product): Promise<Product>
    {
        console.log("[ProductService::updateProduct] Updating product ", id)
        return data
    }
}