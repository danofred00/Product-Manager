import { DeliveryRepository } from "@/services/database/repositories/deliveries.repository";
import { Delivery } from "@/types";

export class DeliveriesService {

    static async getAll() {
        return DeliveryRepository.getAll()
    }

    static async get(id: string|number) {
        return DeliveryRepository.get(String(id))
    }

    static async create(delivery: Delivery) {
        return DeliveryRepository.create(delivery)
    }

    static async update(id: string|number, delivery: Delivery) {
        return DeliveryRepository.update(String(id), delivery)
    }

    static async delete(id: string|number) {    
        return DeliveryRepository.delete(String(id))
    }
}