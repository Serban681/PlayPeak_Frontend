import { CartEntry } from "@/models/CartEntry";
import { SmallTag } from "./Tag";

export default function OrderCartEntry({ cartEntry }: { cartEntry: CartEntry }) {
    return (
        <div className="mt-3 border-b-2 pb-1 w-full">
            <h4 className="text-black font-normal text-base inline-block">{cartEntry.productVariance.product.name}</h4>
            
            <div className="inline-block -translate-y-0.5">
                {cartEntry.productVariance.attributesAndValues.map((attributeAndValue, index) => <SmallTag customStyles="ml-3" value={attributeAndValue.value} key={index} />)}
            </div>

            <h5 className="text-black font-medium text-base inline-block float-right">{cartEntry.quantity} x {cartEntry.productVariance.product.price.toFixed(2)}$</h5>
        </div>
    )
}
