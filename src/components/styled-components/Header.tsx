import React from 'react';
import { StyledTitle } from './Title';
import { BigBtn } from './Buttons';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
    return (
        <div className='mx-5'>
            <StyledTitle customStyles='absolute sm:left-1/2 sm:translate-x-[-50%] cursor-pointer' />
            <div className="flex justify-between mt-5">
                <div className="block bg-red-100 w-0 h-0"></div>
                <div className='flex'>
                    <ShoppingCartIcon className='size-7 mt-2 mr-4 cursor-pointer hover:scale-110' />
                    <BigBtn>Sign In</BigBtn>
                </div>
            </div>
        </div>
        
    )
}
