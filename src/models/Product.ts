export interface Product {
    id?: number,
    name: string,
    price: number,
    category: string,
    attributesAndAttributeValues: {
        name: string,
        values: string[]
    }[]
}
