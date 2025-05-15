'use client'

import { ProductCardInventoryPage } from "@/components/styled-components/ProductCard"
import { SectionTitle } from "@/components/styled-components/SectionTitle"
import { ShopContext } from "@/context/ShopContext"
import useGetUser from "@/hooks/useGetUser"
import { deleteProductById, getAllProducts, searchProductsByName } from "@/lib/productRequests"
import { Product } from "@/models/Product"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function Page() {
    const [products, setProducts] = useState<Product[]>([])

    const { setNotifierState } = useContext(ShopContext)!

    const [productName, setProductName] = useState('')

    const { user } = useGetUser()
    const router = useRouter()

    useEffect(() => {
        if(user.role == "USER")
        {
            router.push('/')
        }

        getAllProducts([], "NAME_ASC")
            .then(res => setProducts(res[0].products))
    }, [])

    useEffect(() => {
        searchProductsByName(productName)
            .then(products => setProducts(products))
    }, [productName])

    const deleteProduct = (id: number) => {
        deleteProductById(id)
            .then(_ => searchProductsByName(productName)
                            .then(products => setProducts(products))
            ).catch(err => setNotifierState({isError: true, message: err.message}))
    }

    return (
        <div>
            <SectionTitle>Products</SectionTitle>

            <label className="block my-5 text-xl font-medium">
                Search:
                <input value={productName} onChange={(e) => setProductName(e.target.value)} className="focus:outline-none focus:border-black border-2 rounded-xl py-1 px-2 mb-3 ml-2 font-light" />
            </label>  
            {products.map((product, index) => <ProductCardInventoryPage key={index} product={product} handleDelete={deleteProduct} customStyles="mb-5" />)}
        </div>
    )
}
