import { User } from "@/types"

export const fullname = (user: User): string => {
    return [user.firstname, user.lastname].join(' ')
}