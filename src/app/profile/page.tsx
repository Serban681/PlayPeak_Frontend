'use client'

import { RawTextInput } from "@/components/form-hook-lib-inputs/TextInput"
import { BigBtn, SmallBtn } from "@/components/styled-components/Buttons"
import { SectionTitle } from "@/components/styled-components/SectionTitle"
import { ShopContext } from "@/context/ShopContext";
import useGetUser from "@/hooks/useGetUser";
import { updateUser } from "@/lib/userRequests";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Page() {
    const {setNotifierState } = useContext(ShopContext)!;
    const { user, setUser } = useGetUser();

    const [modifyProfile, setModifyProfile] = useState(false);
    const [modifyDeliveryAddress, setModifyDeliveryAddress] = useState(false);
    const [modifyBillingAddress, setModifyBillingAddress] = useState(false);

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        age: '0', 
        gender: 'NOT_MENTIONED'
    });

    const [deliveryAddress, setDeliveryAddress] = useState({
        streetLine: '',
        postalCode: '',
        city: '',
        county: '',
        country: ''
    });

    const [billingAddress, setBillingAddress] = useState({
        streetLine: '',
        postalCode: '',
        city: '',
        county: '',
        country: ''
    });

    useEffect(() => {
        if(user) {
            setUserDetails({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: user.password,
                age: user.age,
                gender: user.gender
            });
            setDeliveryAddress(user.defaultDeliveryAddress);
            setBillingAddress(user.defaultBillingAddress);   
        }
    }, [user]);

    const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    }

    const handleDeliveryAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryAddress({
            ...deliveryAddress,
            [e.target.name]: e.target.value
        });
    }

    const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBillingAddress({
            ...billingAddress,
            [e.target.name]: e.target.value
        });
    }

    const updateProfile = () => {
        console.log({
            defaultDeliveryAddress: { ...deliveryAddress },
            defaultBillingAddress: { ...billingAddress }
        })

        updateUser({
            id: user.id!,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber,
            password: userDetails.password,
            gender: userDetails.gender,
            age: userDetails.age,
            defaultDeliveryAddress: { ...deliveryAddress },
            defaultBillingAddress: { ...billingAddress }
        }).then(res => {setUser(res)})
            .then(() => setNotifierState({ isError: false, message: 'Profile updated successfully' }))
            .catch(err => setNotifierState({ isError: true, message: 'Profile update failed' }));
    }

    return (
        <div className="flex justify-center w-full">
            <div className="w-10/12">
                <SectionTitle>Profile</SectionTitle>

                <div className="flex flex-col xl:flex-row justify-between w-full">
                    <div>
                        <h3 className="font-medium text-xl mt-5">Personal Details</h3>
                        <div className="my-4">
                            <RawTextInput customStyles={!modifyProfile ? "bg-verylight-gray" : ""} label="First Name"  name="firstName" value={userDetails.firstName} handleChange={handleUserDetailsChange} readOnly={!modifyProfile}  />
                            <RawTextInput customStyles={!modifyProfile ? "bg-verylight-gray" : ""} label="Last Name"  name="lastName" value={userDetails.lastName} handleChange={handleUserDetailsChange} readOnly={!modifyProfile}  />
                            <RawTextInput customStyles={!modifyProfile ? "bg-verylight-gray" : ""} label="Email"  name="email" value={userDetails.email} handleChange={handleUserDetailsChange} readOnly={!modifyProfile}  />
                            <RawTextInput customStyles={!modifyProfile ? "bg-verylight-gray" : ""} label="Phone Number"  name="phoneNumber" value={userDetails.phoneNumber} handleChange={handleUserDetailsChange} readOnly={!modifyProfile}  />
                            {/* <RawTextInput customStyles={!modifyDeliveryAddress ? "bg-verylight-gray" : ""} label="Password"  name="password" value={userDetails.password} handleChange={handleDeliveryAddressChange} readOnly={!modifyDeliveryAddress}  /> */}
                            <SmallBtn handleClick={() => setModifyProfile(!modifyProfile)} customStyles="mt-3 bg-turqoise">{modifyProfile ? 'Done' : 'Edit'}</SmallBtn>
                        
                            <h3 className="font-medium text-xl mt-7">Change Password</h3>
                            <p className="mt-2 mb-3">Click <Link className="underline" href={'/change-password'}>here</Link> to change your password</p>
                            
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-xl mt-5">Shipping Address</h3>
                        <div className="my-4">
                            <RawTextInput customStyles={!modifyDeliveryAddress ? "bg-verylight-gray" : ""} label="Street Line"  name="streetLine" value={deliveryAddress.streetLine} handleChange={handleDeliveryAddressChange} readOnly={!modifyDeliveryAddress}  />
                            <RawTextInput customStyles={!modifyDeliveryAddress ? "bg-verylight-gray" : ""} label="Postal Code"  name="postalCode" value={deliveryAddress.postalCode} handleChange={handleDeliveryAddressChange} readOnly={!modifyDeliveryAddress}  />
                            <RawTextInput customStyles={!modifyDeliveryAddress ? "bg-verylight-gray" : ""} label="City"  name="city" value={deliveryAddress.city} handleChange={handleDeliveryAddressChange} readOnly={!modifyDeliveryAddress}  />
                            <RawTextInput customStyles={!modifyDeliveryAddress ? "bg-verylight-gray" : ""} label="County"  name="county" value={deliveryAddress.county} handleChange={handleDeliveryAddressChange} readOnly={!modifyDeliveryAddress}  />
                            <RawTextInput customStyles={!modifyDeliveryAddress ? "bg-verylight-gray" : ""} label="Country"  name="country" value={deliveryAddress.country} handleChange={handleDeliveryAddressChange} readOnly={!modifyDeliveryAddress}  />
                            <SmallBtn handleClick={() => setModifyDeliveryAddress(!modifyDeliveryAddress)} customStyles="mt-3 bg-turqoise">{modifyDeliveryAddress ? 'Done' : 'Edit'}</SmallBtn>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-xl mt-5">Billing Address</h3>
                        <div className="my-4">
                            <RawTextInput customStyles={!modifyBillingAddress ? "bg-verylight-gray" : ""} label="Street Line"  name="streetLine" value={billingAddress.streetLine} handleChange={handleBillingAddressChange} readOnly={!modifyBillingAddress}  />
                            <RawTextInput customStyles={!modifyBillingAddress ? "bg-verylight-gray" : ""} label="Postal Code"  name="postalCode" value={billingAddress.postalCode} handleChange={handleBillingAddressChange} readOnly={!modifyBillingAddress}  />
                            <RawTextInput customStyles={!modifyBillingAddress ? "bg-verylight-gray" : ""} label="City"  name="city" value={billingAddress.city} handleChange={handleBillingAddressChange} readOnly={!modifyBillingAddress}  />
                            <RawTextInput customStyles={!modifyBillingAddress ? "bg-verylight-gray" : ""} label="County"  name="county" value={billingAddress.county} handleChange={handleBillingAddressChange} readOnly={!modifyBillingAddress}  />
                            <RawTextInput customStyles={!modifyBillingAddress ? "bg-verylight-gray" : ""} label="Country"  name="country" value={billingAddress.country} handleChange={handleBillingAddressChange} readOnly={!modifyBillingAddress}  />
                            <SmallBtn handleClick={() => setModifyBillingAddress(!modifyBillingAddress)} customStyles="mt-3 bg-turqoise">{modifyBillingAddress ? 'Done' : 'Edit'}</SmallBtn>
                        </div>
                    </div>
                </div>

                

                <BigBtn handleClick={() => updateProfile()} customStyles="mt-16">Update Profile</BigBtn>
            </div>
        </div>
    )
}
