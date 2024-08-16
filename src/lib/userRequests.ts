'use client'

import { User } from "@/models/User";

export async function login(email: string, password: string) : Promise<Response> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return response.json();
}

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
