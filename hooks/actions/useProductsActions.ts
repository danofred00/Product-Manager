import { Product } from "@/types"
import { useStore } from "../useStore"
import { ProductService } from "@/services/products.service"

export default function  useProductsActions()
{
    const { addProduct: add, removeProduct: remove, setProducts, products } = useStore()

    const refresh = async () => {
        const products = await ProductService.getProducts()
        setProducts([...products])
    }

    const addProduct = async (product: Product) => {
        product.id = String(products.length + 1)
        ProductService.addProduct(product).then(() => {
            refresh()
        })
    }

    const removeProduct = async (id: string) => {
        ProductService.removeProduct(id).then((success) => {
            if(success) {
                remove(id)
                refresh()
            }
        })
    }

    const fetchProducts = async () => {
        ProductService.getProducts().then(data => setProducts(data))
    }

    const updateProduct = async (id: string, data: Product) => {
        ProductService.updateProduct(id, data).then(async () => {
            await refresh()
        })
    }

    return {
        fetchProducts,
        addProduct,
        removeProduct,
        updateProduct
    }
}