import { ProductVarianceDemand } from "@/models/ProductVarianceDemand";

export async function getVariancesDemandPrediction(productId: number) : Promise<ProductVarianceDemand[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/demand-prediction/${productId}`)

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

export async function generateNewVarianceDemandPrediction(productVarianceId: number, daysToPredict: number, totalDays: number) : Promise<ProductVarianceDemand> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/demand-prediction/${productVarianceId}?daysToPredict=${daysToPredict}&totalDays=${totalDays}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}
