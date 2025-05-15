'use client'

import { BigBtn } from "@/components/styled-components/Buttons";
import CartEntryComponent from "@/components/styled-components/CartEntryComponent"
import { SectionTitle } from "@/components/styled-components/SectionTitle"
import { ShopContext } from "@/context/ShopContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Page() {
    const { cart, setCart } = useContext(ShopContext)!;
    
    const router = useRouter();

    return (
        <div>
            <SectionTitle customStyles="mb-4">My Cart</SectionTitle>

            <div>
                {cart?.cartEntries.length === 0 && <h3 className="text-center">Your cart is empty</h3>}
            </div>

            {cart?.cartEntries.map((cartEntry, index) => (
                <CartEntryComponent customStyles="mb-5" key={index} cartEntry={cartEntry} cart={cart} />
            ))}
            <h5 className="text-lg font-medium mt-10">Total Price: {cart?.totalPrice.toFixed(2)}$</h5>
            {cart?.cartEntries.length !== 0 && <BigBtn handleClick={() => router.push('/checkout')} customStyles="mt-2">Proceed to checkout</BigBtn>}
        </div>
    )
}
