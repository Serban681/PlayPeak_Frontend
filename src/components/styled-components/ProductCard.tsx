import { Product } from "@/models/Product";
import { BigBtn } from "./Buttons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getVariancesForProduct } from "@/lib/productVarianceRequests";
import { SmallTag } from "./Tag";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { deleteProductById } from "@/lib/productRequests";

export default function ProductCard({ product, customStyles }: { product: Product, customStyles?: string }) {
    const router = useRouter();
    
    const [isInStock, setIsInStock] = useState(true)

    return (
        <div className="relative flex flex-col px-5 py-4 w-80 h-96 border-2 border-solid border-black rounded-3xl shadow-big">
            {!product.inStock && <div className="absolute bg-red text-white font-medium -rotate-[25deg] left-14 top-8 px-1">Out of stock</div>}
            
            <div className="flex justify-center mt-2">
                <img className="h-48"
                    src={product.photoUrl} 
                    alt="product image"/>
            </div>

            <div className="mt-4 flex justify-center">
                <h3 className="font-medium text-xl">{product.name}</h3>
            </div>
            <div className="mt-3 flex justify-center">
                <h6 className="text-sm">Price: {product.price.toFixed(2)}$</h6>
            </div>
            <div className="flex justify-center mt-4">
                <BigBtn 
                    active={product.inStock} 
                    handleClick={() => router.push(`/product/${product.id}`)}>More</BigBtn>
            </div>
        </div>
    )
}

export function ProductCardInventoryPage({customStyles, product, handleDelete} : {customStyles?: string, product: Product, handleDelete: (id:number) => void}) {
    const router = useRouter()

    return (
        <div className={`${customStyles} px-4 w-full h-24 border-2 border-black shadow-big rounded-3xl flex justify-between items-center`}>
            <div className="text-xl font-medium">
                <h5 className="inline-block md:inline mr-3 text-sm w-8 md:w-full lg:text-xl">{product.name}</h5>
                <img className="w-12 hidden md:inline" src={product.photoUrl} />
                <div className='hidden lg:inline'>{ product.attributesAndAttributeValues.map((aaav, index) => <SmallTag key={index} value={aaav.name} customStyles='ml-2' />) }</div> 
            </div>

            <div>
                <div className="scale-150 flex flex-row">
                    <PencilSquareIcon onClick={() => router.push(`/edit-product/${product.id}`)} className="hover:scale-125 cursor-pointer size-4 mr-1.5" />
                    <TrashIcon onClick={() => handleDelete(product.id!)} className="hover:scale-125 cursor-pointer size-4 mr-1.5" />
                </div>
            </div>
        </div>
    )
}
