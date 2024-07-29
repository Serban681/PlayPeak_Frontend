'use client'

import { Address } from "@/models/Address";


export async function getAllAddresses() : Promise<Address[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/address');

    return response.json();
}

export async function getAddressById(id: number) : Promise<Address> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/address/' + id);

    return response.json();
}

export async function addAddress(address: Address) : Promise<Address> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
    });

    return response.json();
}

export async function updateAddress(address: Address) : Promise<Address> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/address', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
    });

    return response.json();
}

export async function deleteAddress(id: number) : Promise<void> {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/address/' + id, {
        method: 'DELETE'
    });
}
