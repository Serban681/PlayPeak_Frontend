import { Product } from "@/models/Product";
import Image from "next/image";

export default function ProductCard(){//{ product }: { product: Product }) {
    return (
        <div className="flex flex-col px-5 py-4 w-56 h-80 border-2 border-solid border-black rounded-3xl shadow-big">
            <div className="flex justify-center">
                <img className="h-36"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SoYsXmu_-uMQnJ7PPr6v9ND3jrq3oYri-g&s" 
                    alt="product image"/>
            </div>

            <div className="mt-3">
                <h3 className="font-medium text-base">Cool T-shirt</h3>
            </div>
            <div className="mt-1">
                <h4 className="text-sm font-medium">Colors</h4>
                
            </div>
        </div>
    )
}
