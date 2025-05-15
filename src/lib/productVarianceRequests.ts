import { ProductVariance } from "@/models/ProductVariance";

export async function getVariancesForProduct(productId: number) : Promise<ProductVariance[]> {
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/product-variance/product/${productId}`)

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

export async function setQuantityForVariance(varianceId: number, quantity: number) : Promise<ProductVariance> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/product-variance/update-quantity/${varianceId}?quantity=${quantity}`, {
        method: 'PUT'
    })

    if(!response.ok) {
        return Promise.reject(await response.json())
    }

    return response.json()
}
