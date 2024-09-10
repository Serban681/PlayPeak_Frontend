import { Product } from "./Product";

export interface CartEntry {
    id: number,
    product: Product,
    quantity: number,
    pricePerPiece: number,
    totalPrice: number
}
