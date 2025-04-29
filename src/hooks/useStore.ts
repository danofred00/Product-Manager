import { productsSelector, userSelector } from "@/features/store"
import { deliveriesSelector } from "@/features/store/deliveries.store"
import { addProduct, removeProduct, setProducts } from "@/features/store/products.store"
import { sellsSelector } from "@/features/store/sells.store"
import { setUser } from "@/features/store/user.store"
import { Product, User } from "@/types"
import { useDispatch, useSelector } from "react-redux"

export function useStore()
{
    const user = useSelector(userSelector)
    const products = useSelector(productsSelector)
    const deliveries = useSelector(deliveriesSelector)
    const sells = useSelector(sellsSelector)
    const dispatch = useDispatch()

    return {
        user,
        setUser: (user: User) => dispatch(setUser(user)),
        products,
        setProducts: (products: Product[]) => dispatch(setProducts(products)),
        addProduct: (product: Product) => dispatch(addProduct(product)),
        removeProduct: (id: string) => dispatch(removeProduct(id)),
        deliveries,
        sells
    }
}