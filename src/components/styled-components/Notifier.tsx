'use client'

import { ShopContext } from "@/context/ShopContext"
import { useContext, useEffect, useState } from "react"

export default function Notifier() {
    const { notifierState, setNotifierState } = useContext(ShopContext)!

    const [show, setShowState] = useState(false)

    useEffect(() => {
        if(notifierState.message !== '') {
            setShowState(true)
            setTimeout(() => {
                setShowState(false)
            }, 2000)
            setTimeout(() => {
                setNotifierState({message: ''})
            }, 1000)
        }
    }, [notifierState])

    return (
        <div className={`${show ? 'top-5' : '-top-20'} transition-all duration-300 ease-in-out z-40 bg-red-400 absolute left-1/2 translate-x-[-50%] text-white font-medium text-xl p-3 rounded-xl max-w-96 text-center`}>
            You cannot add a product to cart without logging in!
        </div>
    )
}
