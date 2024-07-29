'use client'

import Btn from "@/components/Btn";
import FormCheckInput from "@/components/FormCheckInput";
import FormTextInput from "@/components/FormTextInput";
import { addUser } from "@/lib/userRequests";
import { checkFieldsNotEmpty } from "@/lib/Validators";
import { Address } from "@/models/Address";
import { useEffect, useState } from "react";

export default function UserRegisterForm() {
    const [step, setStep] = useState(0);

    const [user, setUser] = useState<{
        [key: string]: any,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        password: string,
        passwordConfirm: string,
        defaultDeliveryAddress: Address
        useAddressForBilling: boolean,
        defaultBillingAddress: Address
    }>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
        defaultDeliveryAddress: {
            streetLine: '',
            postalCode: '',
            city: '',
            county: '',
            country: ''
        },
        useAddressForBilling: false,
        defaultBillingAddress: {
            streetLine: '',
            postalCode: '',
            city: '',
            county: '',
            country: ''
        }
    });

    const updateForm = (name:string,  value: string): void => {
        setUser({...user, [name]: value});
    }

    const updateNestedFormString = (name: string, value: string): void => {
        const [key, subkey] = name.split('.');
        setUser({...user, [key]: {...user[key], [subkey]: value}});
    }

    const updateFormBool = (name: string, checked: boolean): void => {
        setUser({...user, [name]: checked});
    }

    useEffect(() => {
        if(user.useAddressForBilling) {
            setUser({...user, defaultBillingAddress: {...user.defaultDeliveryAddress}});
        } else {
            setUser({...user, defaultBillingAddress: {
                streetLine: '',
                postalCode: '',
                city: '',
                county: '',
                country: ''}
            })
        }
    }, [user.useAddressForBilling, user.defaultDeliveryAddress]);

    const goToPrevStep = () => {
        setStep(step - 1);
    }

    const goToNextStep = () => {
        setStep(step + 1);
    }

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        
        addUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            defaultDeliveryAddress: user.defaultDeliveryAddress,
            defaultBillingAddress: user.defaultBillingAddress
        });
    }

    return (
        <form>
        {(step === 0) && (
            <>
                <h3>Set User Data</h3>

                <FormTextInput label={"First name"} type={"text"} name="firstName" value={user.firstName} changeFn={updateForm} addValidation validated={!!user.firstName} />
                <FormTextInput label={"Last name"} type={"text"} name="lastName" value={user.lastName} changeFn={updateForm} addValidation validated={!!user.lastName} />
                <FormTextInput label={"Email"} type={"email"} name="email" value={user.email} changeFn={updateForm} addValidation validated={!!user.email} />
                <FormTextInput label={"Phone number"} type={"text"} name="phoneNumber" value={user.phoneNumber} changeFn={updateForm} addValidation validated={!!user.phoneNumber} />
                <FormTextInput label={"Password"} type={"password"} name="password" value={user.password} changeFn={updateForm} addValidation validated={!!user.password} />
                <FormTextInput label={"Confirm password"} type={"password"} name="passwordConfirm" value={user.passwordConfirm} changeFn={updateForm} addValidation validated={!!user.passwordConfirm && user.password === user.passwordConfirm} />
                
                <Btn text={"Next"} handleClick={goToNextStep} />
            </>
            
        )}

        {(step === 1) && (
            <>
                <h3>Set Delivery Address</h3>

                <FormTextInput label={"Street line"} type={"text"} name="defaultDeliveryAddress.streetLine" value={user.defaultDeliveryAddress.streetLine} changeFn={updateNestedFormString} addValidation validated={!!user.defaultDeliveryAddress.streetLine} />
                <FormTextInput label={"Postal code"} type={"text"} name="defaultDeliveryAddress.postalCode" value={user.defaultDeliveryAddress.postalCode} changeFn={updateNestedFormString} addValidation validated={!!user.defaultDeliveryAddress.postalCode} />
                <FormTextInput label={"City"} type={"text"} name="defaultDeliveryAddress.city" value={user.defaultDeliveryAddress.city} changeFn={updateNestedFormString} addValidation validated={!!user.defaultDeliveryAddress.city} />
                <FormTextInput label={"County"} type={"text"} name="defaultDeliveryAddress.county" value={user.defaultDeliveryAddress.county} changeFn={updateNestedFormString} addValidation validated={!!user.defaultDeliveryAddress.county} />
                <FormTextInput label={"Country"} type={"text"} name="defaultDeliveryAddress.country" value={user.defaultDeliveryAddress.country} changeFn={updateNestedFormString} addValidation validated={!!user.defaultDeliveryAddress.country} />
                
                <FormCheckInput label={"Use same address for billing"} name={"useAddressForBilling"} checked={user.useAddressForBilling} handleCheck={updateFormBool} />

                <div></div>
                <Btn text={"Prev"} handleClick={goToPrevStep} customStyles={"mr-2"} />
                {
                    user.useAddressForBilling ? 
                        <Btn text={"Submit"} submit handleClick={submitForm} formValid={checkFieldsNotEmpty(user) && (user.password === user.passwordConfirm)} /> 
                        : 
                        <Btn text={"Next"} handleClick={goToNextStep} />
                }
            </>
        )}

        {(step == 2) && (
            <>
                <h3>Set Billing Address</h3>
                                
                <FormTextInput label={"Street line"} type={"text"} name="defaultBillingAddress.streetLine" value={user.defaultBillingAddress.streetLine} changeFn={updateNestedFormString} addValidation validated={!!user.defaultBillingAddress.streetLine} />
                <FormTextInput label={"Postal code"} type={"text"} name="defaultBillingAddress.postalCode" value={user.defaultBillingAddress.postalCode} changeFn={updateNestedFormString} addValidation validated={!!user.defaultBillingAddress.postalCode} />
                <FormTextInput label={"City"} type={"text"} name="defaultBillingAddress.city" value={user.defaultBillingAddress.city} changeFn={updateNestedFormString} addValidation validated={!!user.defaultBillingAddress.city} />
                <FormTextInput label={"County"} type={"text"} name="defaultBillingAddress.county" value={user.defaultBillingAddress.county} changeFn={updateNestedFormString} addValidation validated={!!user.defaultBillingAddress.county} />
                <FormTextInput label={"Country"} type={"text"} name="defaultBillingAddress.country" value={user.defaultBillingAddress.country} changeFn={updateNestedFormString} addValidation validated={!!user.defaultBillingAddress.country} />

                <Btn text={"Prev"} handleClick={goToPrevStep} customStyles={"mr-2"} />
                <Btn text={"Submit"} submit handleClick={submitForm} formValid={checkFieldsNotEmpty(user) && (user.password === user.passwordConfirm)} />
            </>
        )}
        </form>
    )
}
