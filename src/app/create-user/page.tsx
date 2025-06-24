'use client'

import { BigBtn } from "@/components/styled-components/Buttons";
import { RadioInput, TextInput } from "@/components/styled-components/FormInput";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import { ShopContext } from "@/context/ShopContext";
import useGetUser from "@/hooks/useGetUser";
import { addUser } from "@/lib/userRequests";
import { Address } from "@/models/Address";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
    const router = useRouter();

    const [step, setStep] = useState(0);

    const {notifierState, setNotifierState } = useContext(ShopContext)!;

    const { setUser } = useGetUser();

    const { handleSubmit, control, formState, getValues, setValue } = useForm<{
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        password: string,
        age: string,
        gender: string,
        passwordConfirm: string,
        defaultDeliveryAddress: Address
        defaultBillingAddress: Address
    }>({
        defaultValues: {
            firstName: 'Bill',
            lastName: 'Ackman',
            email: 'bill@gmail.com',
            phoneNumber: '072819232',
            password: 'Bill123',
            passwordConfirm: 'Bill123',
            age: '45',
            gender: 'MALE', 
            defaultDeliveryAddress: {
                streetLine: 'Main Street',
                postalCode: '083729',
                city: 'NY',
                county: 'NY',
                country: ''
            },
            defaultBillingAddress: {
                streetLine: '',
                postalCode: '',
                city: '',
                county: '',
                country: ''
            }
        },
        mode: 'all'
    });

    const [useAddressForBilling, setUseAddressForBilling] = useState(false);

    const goToPrevStep = () => {
        setStep(step - 1);
    }

    const goToNextStep = () => {
        setStep(step + 1);
    }

    const toggleUseSameAddressForBilling = (useSameAddress: boolean) => {
        setUseAddressForBilling(useSameAddress);

        if(useSameAddress === true) {
            setValue("defaultBillingAddress", getValues("defaultDeliveryAddress"), {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
            });
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        addUser(data)
            .then(async res => {
                await setUser(res)
            })
            .then(() => window.location.href = '/')
            .catch(async err => setNotifierState({ ...notifierState, message: err }));
    });

    const getSectionTitleInfo = () => {
        if(step === 0) {
            return "Personal Information";
        } else if(step === 1) {
            return "Delivery Address";
        } else if(step === 2) {
            return "Billing Address";
        }
    }

    return (
        <div>
            <div className="flex justify-center">
                <div>
                    <SectionTitle customStyles="mb-5">Register {getSectionTitleInfo()}</SectionTitle>

                    {/* <UserRegisterForm /> */}    
                    <form onSubmit={onSubmit}>
                        {(step === 0) && (
                            <>
                                <TextInput label="First name" control={control} name="firstName" rules={{ required: true }} />
                                <TextInput label="Last name" control={control} name="lastName" rules={{ required: true }} />
                                <TextInput label="Email" control={control} name="email" rules={{ required: true }} />
                                <TextInput label="Phone number" control={control} name="phoneNumber" rules={{ required: true }} />
                                <TextInput label="Password" control={control} name="password" rules={{ required: true }} />
                                <TextInput label="Confirm password" control={control} name="passwordConfirm" rules={{ required: true }} />
                                <RadioInput label="Gender" options={["Male", "Female", "Prefer not to say"]} values={["MALE", "FEMALE", "NOT_MENTIONED"]} currentValue={getValues("gender")} setCurrentValue={(e) => setValue("gender", e.target.value)} />
                                <TextInput label="Age" control={control} name="age" rules={{ required: true }} />

                                <Link className="block mt-[-0.5rem] mb-2 font-medium underline" href={'/login'}>Already have an account? Log in here!</Link>
                                <BigBtn handleClick={goToNextStep}>Next</BigBtn>
                            </>
                        )}

                        {(step === 1) && (
                            <>
                                <TextInput label="Street Line" control={control} name="defaultDeliveryAddress.streetLine" rules={{ required: true }} />
                                <TextInput label="Postal Code" control={control} name="defaultDeliveryAddress.postalCode" rules={{ required: true }} />
                                <TextInput label="City" control={control} name="defaultDeliveryAddress.city" rules={{ required: true }} />
                                <TextInput label="County" control={control} name="defaultDeliveryAddress.county" rules={{ required: true }} />
                                <TextInput label="Country" control={control} name="defaultDeliveryAddress.country" rules={{ required: true }} />

                                <label className="block my-2 text-xl font-medium">
                                    Use same address for billing: <span />
                                    <input checked={useAddressForBilling} onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleUseSameAddressForBilling(e.target.checked)} className="w-4 h-4" type="checkbox" name="useAddressForBilling" />
                                </label>

                                <BigBtn handleClick={goToPrevStep} customStyles={"mr-2"}>Prev</BigBtn>
                                {useAddressForBilling ? 
                                    <BigBtn submit active={formState.isValid && getValues("password") == getValues("passwordConfirm")}>Submit</BigBtn> 
                                    : 
                                    <BigBtn handleClick={goToNextStep}>Next</BigBtn>}
                            </>
                        )}

                        {(step == 2) && (
                            <>
                                <TextInput label="Street Line" control={control} name="defaultBillingAddress.streetLine" rules={{ required: true }} />
                                <TextInput label="Postal Code" control={control} name="defaultBillingAddress.postalCode" rules={{ required: true }} />
                                <TextInput label="City" control={control} name="defaultBillingAddress.city" rules={{ required: true }} />
                                <TextInput label="County" control={control} name="defaultBillingAddress.county" rules={{ required: true }} />
                                <TextInput label="Country" control={control} name="defaultBillingAddress.country" rules={{ required: true }} />
                            
                                <BigBtn handleClick={goToPrevStep} customStyles={"mr-2"}>Prev</BigBtn>
                                <BigBtn submit active={formState.isValid && getValues("password") == getValues("passwordConfirm")}>Submit</BigBtn>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
