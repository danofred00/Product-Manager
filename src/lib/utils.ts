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

export const objectEquals = (a:any , b: any) => {
    if(typeof a !== typeof b) {
        return false
    }
    let result = true

    if( a instanceof Object ) {
        for(const key in a) {
            if(a[key] !== b[key]) {
                result = false
                break;
            }
        }
    }

    return result
}

export const sum = (numbers: number[]): number => {
    let result = 0
    for(const n of numbers) {
        result += n
    }
    return result
}