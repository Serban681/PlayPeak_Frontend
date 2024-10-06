'use client'

import { BigBtn } from '@/components/styled-components/Buttons';
import { sendResetPasswordMail } from '@/lib/userRequests';
import { selectUser } from '@/store/userSlice';
import { EnvelopeIcon as EnveloperIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Page() {
    const router = useRouter();

    const user = useSelector(selectUser);

    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if(user.id === -1) router.push('/')

        if(emailSent) return;

        sendResetPasswordMail(user.email)
        .then(() => setEmailSent(true))
    }, [])

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className="text-center">
                <div className='flex justify-center mb-2'>
                    <EnveloperIcon className="size-10 text-light-gray" />
                </div>
                <h3 className="text-xl font-medium capitalize mb-2">Check your email</h3>
                <p className='text-center'>Look for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
                <BigBtn customStyles='mt-8' handleClick={() => router.push('/')}>Take me home</BigBtn>
            </div>
        </div>
    )
}
