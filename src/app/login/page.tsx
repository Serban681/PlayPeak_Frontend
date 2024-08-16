'use client' 

import Btn from "@/components/form-hook-lib-inputs/Btn";
import TextInput from "@/components/form-hook-lib-inputs/TextInput";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/userRequests";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { setUser } from "@/store/userSlice";

type UserCredentials = {
    email: string;
    password: string;
}

export default function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    // const defaultDeliveryAddress =  useAppSelector(selectDefaultDeliveryAddress);


    const { register, handleSubmit, control } = useForm<UserCredentials>({
      defaultValues: {
        email: "",
        password: ""
      },
      mode: "all",
    });

    const onSubmit = handleSubmit(async (data) => {
      // setLoading(true);
      // dispatch(addUser(data))
      
      login(data.email, data.password)
        .then(async res => await dispatch(setUser(res)))
        .then(() => router.push('/'))
        .catch(async err => await console.log(222, err))       
    });

    return (
        <div>
            <h1>Login</h1>
            
            <form onSubmit={onSubmit}>
                <TextInput label="Email" control={control} name="email" rules={{ required: true }} />
                <TextInput label="Password" control={control} name="password" rules={{ required: true }} />
                <Btn submit>Submit</Btn>

                {/* TODO: Set Status repsonse error text in some way */}

                {/* {error.toString()} */}
            </form>
        </div>
    );
}
