'use client'

import { User } from "@/models/User";
import { useEffect, useState } from "react";

export default function useGetUser() {
    const [user, setCurrUser] = useState<User>({
        id: -1, 
        email: '', 
        firstName: '', 
        lastName: '',
        profileImageUrl: '',
        phoneNumber: '', 
        gender: '',
        age: '0',
        password: '',
        defaultDeliveryAddress: {
            id: -1,
            streetLine: '',
            city: '',
            postalCode: '',
            county: '',
            country: ''
        }, 
        defaultBillingAddress: {
            id: -1,
            streetLine: '',
            city: '',
            postalCode: '',
            county: '',
            country: ''
        }
    });

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                setCurrUser(JSON.parse(storedUser));
            }
        };

        fetchUser();
    }, [])

    const setUser = (user: User) => {
        setCurrUser(user);

        localStorage.setItem('user', JSON.stringify(user));
    };

    const setEmptyUser = () => {
        setCurrUser({
            id: -1, 
            email: '', 
            firstName: '', 
            lastName: '',
            profileImageUrl: '',
            phoneNumber: '', 
            password: '',
            gender: '',
            age: '0',
            defaultDeliveryAddress: {
                id: -1,
                streetLine: '',
                city: '',
                postalCode: '',
                county: '',
                country: ''
            }, 
            defaultBillingAddress: {
                id: -1,
                streetLine: '',
                city: '',
                postalCode: '',
                county: '',
                country: ''
            }
        });

        localStorage.removeItem('user');
    }

    return { user, setUser, setEmptyUser };
}
