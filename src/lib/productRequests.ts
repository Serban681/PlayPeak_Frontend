import { Product } from "@/models/Product";

export async function getAllProducts(categories: string[], sortMethod: string): Promise<{
    category: string,
    products: Product[]
}[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/product/search-category',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categories,
                sortMethod
            })
        }
    );

    return response.json();
}

export async function searchProductsByName(name: string): Promise<Product[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/product/search-name?name=${name}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.json();
}

export async function getProductById(id: number) : Promise<Product> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/product/' + id);
    
    if(!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

export async function deleteProductById(id: number) : Promise<void> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/product/' + id,
        {
            method: 'DELETE'
        }
    )

    if(!response.ok) {
        return Promise.reject(await response);
    }

    return;
}
