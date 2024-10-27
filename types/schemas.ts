import { HOUR_REGEX, NUMBER_REGEX, URL_REGEX } from '@/constants/Regex'
import * as yup from 'yup'

export const productSchema = yup.object({
    id: yup.string(),
    name: yup.string().required().min(3),
    description: yup.string().nullable(),
    price: yup.string().required().matches(NUMBER_REGEX, {message: 'Invalid Price'}),
    state: yup.string().oneOf(['avaliable', 'unavaliable']),
    image: yup.string().required().matches(URL_REGEX, {message: 'Invalid image url'}),
    color: yup.string().default('#ff00ff'),
})

export const userSchema = yup.object({
    firstname: yup.string().min(3).required(),
    lastname: yup.string().default(''),
    description: yup.string().max(32),
})

export const deliverySchema = yup.object({
    id: yup.string().default('0'),
    product_id: yup.string().required(),
    quantity: yup.string().required().matches(NUMBER_REGEX, {message: "Invalid number"}),
    delivery_at: yup.string().required().matches(HOUR_REGEX, {message: 'Incorrect Time'})
})