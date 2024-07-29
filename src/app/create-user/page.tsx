'use client'

import UserRegisterForm from "@/features/CreateUserForm";
import { useRequest } from "@/lib/useRequest";
import { addUser } from "@/lib/userRequests";

export default function Page() {


    return (
        <div>
            <h1>Register user</h1>

            <UserRegisterForm />
        </div>
    );
}
