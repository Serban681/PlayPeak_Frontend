'use client'

import React, { useContext, useEffect } from 'react';
import { StyledLogo } from './Title';
import { BigBtn } from './Buttons';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/userSlice';
import Avatar from './Avatar';
import { getCartByUserId } from '@/lib/cartRequests';
import { ShopContext } from '@/context/ShopContext';

export default function Header() {
    const router = useRouter();

    const user = useSelector(selectUser);

    const context = useContext(ShopContext);
    const { cart, setCart } = context!;

    useEffect(() => {
        if(user.id !== -1)
            getCartByUserId(user.id!)
                .then(res => setCart(res))
                .catch(err => console.log(err))
            
    }, [user])

    return (
        <div className='mx-5'>
            <StyledLogo handleClick={() => router.push('/')} customStyles='absolute sm:left-1/2 sm:translate-x-[-50%] cursor-pointer' />
            <div className="flex justify-between mt-5">
                <div className="block bg-red-100 w-0 h-0"></div>
                <div className='flex'>
                    {user.id !== -1 && <ShoppingCartIcon onClick={() => router.push('/cart')} className='size-7 mt-2 mr-4 cursor-pointer hover:scale-110' />}
                    {user.id !== - 1 ?
                        <Avatar handleClick={() => router.push('/profile')} />                         
                        :
                        <BigBtn handleClick={() => router.push('/login')}>Sign In</BigBtn>
                    }
                </div>
            </div>
        </div>
        
    )
}
