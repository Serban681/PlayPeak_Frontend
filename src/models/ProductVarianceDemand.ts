import { ProductVariance } from "./ProductVariance";

export interface ProductVarianceDemand {
    id?: number,
    productVariance: ProductVariance,
    demandPredictions: DemandPrediction[]
}

export interface DemandPrediction {
    id?: number,
    date: Date,
    noOfOrders: number,
    isPredicted: boolean
}
