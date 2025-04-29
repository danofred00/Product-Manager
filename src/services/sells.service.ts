import { SaleRepository } from "@/services/database/repositories/sells.repository";
import { Sale } from "@/types";

export class SellService {

    static async getAll() {
        return SaleRepository.getAll()
    }

    static async get(id: string|number) {
        return SaleRepository.get(String(id))
    }

    static async create(sell: Sale) {
        return SaleRepository.create(sell)
    }

    static async update(id: string|number, sell: Sale) {
        return SaleRepository.update(String(id), sell)
    }

    static async delete(id: string|number) {    
        return SaleRepository.delete(String(id))
    }
}