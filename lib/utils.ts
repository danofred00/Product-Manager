import { User } from "@/types"

export const fullname = (user: User): string => {
    return [user.firstname, user.lastname].join(' ')
}

export const generateColorPalette = (count: number): string[] => {
    const palette: string[] = []

    for (let i = 0; i < count; i++) {
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`
        palette.push(color)
    }
    return palette 
}