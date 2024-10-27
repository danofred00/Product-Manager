import * as yup from 'yup'

export const productSchema = yup.object({
    id: yup.string(),
    name: yup.string().required().min(3),
    description: yup.string().nullable(),
    price: yup.string().required().matches(/^([0-9])+$/, {message: 'Invalid Price'}),
    state: yup.string().oneOf(['avaliable', 'unavaliable']),
    image: yup.string().required().matches(
        /^(file|https?):(\/)*(.)*\.(?:jpe?g|gif|png)$/,
        {message: 'Invalid image url'}),
    color: yup.string().default('#ff00ff'),
})

export const userSchema = yup.object({
    firstname: yup.string().min(3).required(),
    lastname: yup.string().default(''),
    description: yup.string().max(32),
})