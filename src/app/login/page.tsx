'use client' 

import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/userRequests";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { setUser } from "@/store/userSlice";
import { BigBtn } from "@/components/styled-components/Buttons";
import { TextInput } from "@/components/styled-components/FormInput";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import { use, useEffect } from "react";
import Link from "next/link";

type UserCredentials = {
    email: string;
    password: string;
}

export default function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    // const defaultDeliveryAddress =  useAppSelector(selectDefaultDeliveryAddress);


    const { handleSubmit, control, formState } = useForm<UserCredentials>({
      defaultValues: {
        email: "jil.jane@gmail.com",
        password: "Jil123"
      },
      mode: "all",
    });

    const onSubmit = handleSubmit(async (data) => {      
      login(data.email, data.password)
        .then(async res => await dispatch(setUser(res)))
        .then(() => router.push('/'))
        .catch(async err => await console.log(222, err))       
    });

    return (
        <div className="flex justify-center">
          <div className="translate-y-1/2">
            <div>
              <SectionTitle customStyles="mb-5">Login</SectionTitle>
              
              <form onSubmit={onSubmit}>
                  <TextInput label="Email" control={control} name="email" rules={{ required: true }} />
                  <TextInput label="Password" control={control} name="password" rules={{ required: true }} />
                  <Link className="block mt-[-0.5rem] mb-2 font-medium underline" href={'/create-user'}>Don't have an account? Register here!</Link>
                  <BigBtn active={formState.isValid} customStyles="mt-3" submit>Submit</BigBtn>
              </form>
            </div>
          </div>
        </div>
    );
}
