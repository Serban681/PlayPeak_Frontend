'use client'

import { BigBtn } from "@/components/styled-components/Buttons";
import CartEntryComponent from "@/components/styled-components/CartEntryComponent"
import { SectionTitle } from "@/components/styled-components/SectionTitle"
import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";

export default function Page() {
    const { cart, setCart } = useContext(ShopContext)!;
    

    return (
        <div>
            <SectionTitle customStyles="mb-4">My Cart</SectionTitle>

            <div>
                {cart?.cartEntries.length === 0 && <h3 className="text-center">Your cart is empty</h3>}
            </div>

            {cart?.cartEntries.map((cartEntry, index) => (
                <CartEntryComponent key={index} cartEntry={cartEntry} />
            ))}

            {cart?.cartEntries.length !== 0 && <BigBtn  customStyles="mt-10">Proceed to checkout</BigBtn>}
        </div>
    )
}
