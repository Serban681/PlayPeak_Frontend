import { Product } from "@/models/Product";
import { BigBtn } from "./Buttons";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, customStyles }: { product: Product, customStyles?: string }) {
    const router = useRouter();
    
    return (
        <div className="flex flex-col px-5 py-4 w-80 h-96 border-2 border-solid border-black rounded-3xl shadow-big">
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
                <BigBtn handleClick={() => router.push(`/product/${product.id}`)}>More</BigBtn>
            </div>
        </div>
    )
}
