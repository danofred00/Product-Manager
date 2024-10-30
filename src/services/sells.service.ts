import { SellRepository } from "@/services/database/repositories/sells.repository";
import { Sell } from "@/types";

export class SellService {

    static async getAll() {
        return SellRepository.getAll()
    }

    static async get(id: string|number) {
        return SellRepository.get(String(id))
    }

    static async create(sell: Sell) {
        return SellRepository.create(sell)
    }

    static async update(id: string|number, sell: Sell) {
        return SellRepository.update(String(id), sell)
    }

    static async delete(id: string|number) {    
        return SellRepository.delete(String(id))
    }
}