'use client'

import { RawTextInput } from "@/components/form-hook-lib-inputs/Input";
import { SmallBtn } from "@/components/styled-components/Buttons";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import { resetPassword } from "@/lib/userRequests";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage({ params }: { params: { id: number}}) {
    const [newPassword, setNewPassword] = useState('');

    const router = useRouter();

    const submitNewPassword = () => {
        resetPassword(params.id, newPassword)
        router.push('/')
    }
 
    return (
        <div>
            <SectionTitle>Reset Password</SectionTitle>
            <RawTextInput label="New Password" value={newPassword} isPassword={true} customStyles="text" name="password" handleChange={(e) => setNewPassword(e.target.value)}  />
            <SmallBtn customStyles="mt-2" active={newPassword !== ''} handleClick={() => submitNewPassword()}>Reset Password</SmallBtn>
        </div>
    )
}
