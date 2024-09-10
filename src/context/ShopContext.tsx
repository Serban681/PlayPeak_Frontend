'use client'

import { Cart } from "@/models/Cart";
import { createContext, useState } from "react";

interface NotifierContextState {
    message: string;
}

interface ShopContextProps {
    cart: Cart | null;
    setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
    notifierState: NotifierContextState;
    setNotifierState: React.Dispatch<React.SetStateAction<NotifierContextState>>;
}

export const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null)

    const [notifierState, setNotifierState] = useState<NotifierContextState>({
        message: ''
    })

    return (
        <ShopContext.Provider value={{ cart, setCart, notifierState, setNotifierState }}>
            {children}
        </ShopContext.Provider>
    )
}
