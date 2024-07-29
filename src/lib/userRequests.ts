'use client'

import { User } from "@/models/User";

export async function getAllUsers() : Promise<User[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users');

    return response.json();
}

export async function getUserById(id: number) : Promise<User> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + id);

    return response.json();
}

export async function addUser(address: User) : Promise<User> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
    });

    return response.json();
}

export async function updateUser(address: User) : Promise<User> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
    });

    return response.json();
}

export async function deleteUser(id: number) : Promise<void> {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + id, {
        method: 'DELETE'
    });
}
