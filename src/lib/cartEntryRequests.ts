export async function createCartEntry(productId: number, cartId: number) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/cart-entry?productId=${productId}&cartId=${cartId}`, {
        method: 'POST'
    })

    if(!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

export async function removeCartEntry(cartId: number, cartEntryId: number) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/cart-entry/remove?cartId=${cartId}&cartEntryId=${cartEntryId}`,
        {
            method: 'DELETE'
        }
    )

    if(!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

// export async function updateCartEntryQuantity(cartEntryId: number, quantity: number) {
//     const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/cart-entry/update-quantity?cartEntryId=${cartEntryId}&quantity=${quantity}`)

//     if(!response.ok) {
//         return Promise.reject(await response.json());
//     }

//     return response.json();
// }
