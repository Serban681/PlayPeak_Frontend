'use client'

import React, { useContext, useEffect, useState } from 'react';
import { StyledLogo } from './Title';
import { BigBtn } from './Buttons';
import { BuildingLibraryIcon, ShoppingCartIcon as ShoppingCartOutline } from '@heroicons/react/24/outline';
import { ShoppingCartIcon as ShoppingCartSolid } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import Avatar from './Avatar';
import { getCartByUserId } from '@/lib/cartRequests';
import { ShopContext } from '@/context/ShopContext';
import ProfileBox from './ProfileBox';
import useGetUser from '@/hooks/useGetUser';

export default function Header() {
    const router = useRouter();

    const { user } = useGetUser();

    const context = useContext(ShopContext);
    const { cart, setCart } = context!;
    const [isProfileBoxOpened, setIsProfileBoxOpened] = useState(false);

    useEffect(() => {
        if(!!user && user.id !== -1)
            getCartByUserId(user.id!)
                .then(res => setCart(res))
                .catch(err => console.log(err))
    }, [user])

    const getTotalItems = () => {
        return cart?.cartEntries.reduce((acc, curr) => acc + curr.quantity, 0)
    }

    return (
        <div className='mx-5'>
            <StyledLogo handleClick={() => router.push('/')} customStyles='absolute sm:left-1/2 sm:translate-x-[-50%] cursor-pointer' />
            <div className="flex justify-between mt-5">
                <div className="block bg-red-100 w-0 h-0"></div>
                <div className='flex'>
                    {user.role == "ADMIN" && <BuildingLibraryIcon onClick={() => router.push('/inventory')} className='cursor-pointer hover:scale-110 size-7 mt-2 mr-4' /> }
                    
                    {user.id !== -1 && 
                        <div className='relative cursor-pointer hover:scale-110'>
                            {cart?.cartEntries.length! > 0 ? <ShoppingCartSolid onClick={() => router.push('/cart')} className='size-7 mt-2 mr-4' /> : <ShoppingCartOutline onClick={() => router.push('/cart')} className='size-7 mt-2 mr-4' />}
                            
                            {cart?.cartEntries.length! > 0 && <div className='w-4 h-4 bg-red absolute top-1 right-2.5 rounded-full'>
                                <h5 className='text-xs font-medium text-center text-white'>{getTotalItems()}</h5>
                            </div>}
                        </div>
                    }
                    {!!user && user.id !== - 1 ? 
                        <>
                            <Avatar customStyles='mt-1' user={user} handleClick={() => setIsProfileBoxOpened(true)} /> 
                            {isProfileBoxOpened && <ProfileBox handleCloseBtnClick={() => setIsProfileBoxOpened(false)} />}
                        </>
                        :
                        <BigBtn handleClick={() => router.push('/login')}>Sign In</BigBtn>
                    }
                </div>
            </div>
        </div>
    )
}
