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
                setNotifierState({ ...notifierState, message: ''})
            }, 3000)
        }
    }, [notifierState])

    return (
        <div className={`${show ? 'top-5' : '-top-40'} transition-all duration-300 ease-in-out z-40 ${notifierState.isError ? 'bg-red' : 'bg-green'}  absolute left-1/2 translate-x-[-50%] text-white font-medium text-xl p-3 rounded-xl max-w-96 text-center`}>
            {notifierState.message}
        </div>
    )
}
