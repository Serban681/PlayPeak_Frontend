'use client'

import { BigBtn } from "@/components/styled-components/Buttons";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <h1 className="font-normal text-2xl text-center">Thanks for ordering!</h1>
            <p className="mt-2">Your order has been placed successfully. You will receive a confirmation email shortly.</p>  
            <div className="flex justify-center">
                <BigBtn handleClick={() => router.push('/')} customStyles="mt-5">To Home Page</BigBtn> 
            </div>
        </div>
    );
}
