'use client'

import { RawTextInput } from "@/components/form-hook-lib-inputs/TextInput";
import { BigBtn, SmallBtn } from "@/components/styled-components/Buttons";
import OrderCartEntry from "@/components/styled-components/OrderCartEntry";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import { ShopContext } from "@/context/ShopContext";
import useGetUser from "@/hooks/useGetUser";
import { getCartByUserId, removeCartFromUser } from "@/lib/cartRequests";
import { createOrder } from "@/lib/orderRequests";
import { OrderRequest } from "@/models/OrderRequest";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
    const { user } = useGetUser();

    const router = useRouter();

    const [isOrdering, setIsOrdering] = useState(false);

    const { cart, setCart } = useContext(ShopContext)!;

    const [modifyDeliveryAddress, setModifyDeliveryAddress] = useState(false);
    const [modifyBillingAddress, setModifyBillingAddress] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('CASH');

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

    useEffect(() => {
        if(user)
            setDeliveryAddress(user.defaultDeliveryAddress);
            setBillingAddress(user.defaultBillingAddress);
    }, [user]);

    const makeOrder = async () => {
        const requestObject: OrderRequest = {
            userId: user.id!,
            cart: cart!,
            paymentType: selectedPaymentMethod,
            deliveryAddress: deliveryAddress,
            billingAddress: billingAddress
        }

        setIsOrdering(true);

        await createOrder(requestObject)
            .then(async res => {
                if(res.status >= 200 && res.status < 300) {
                    await removeCartFromUser(user.id!)
                    await getCartByUserId(user.id!)
                        .then(res => setCart(res))
                    router.push('/succesful-order')
                }
            })
    }

    return (
        <div className="flex justify-center w-full">
            <div className="w-10/12">
                <SectionTitle customStyles="mt-5 mb-3">Checkout</SectionTitle>
                <div className="flex flex-col xl:flex-row justify-between w-full">
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

                    

                    <div className="w-5/12 lg:mt-7">
                        {cart?.cartEntries.map((cartEntry, index) => <OrderCartEntry key={index} cartEntry={cartEntry} />)}
                        <h5 className="text-black font-medium mt-4 float-right">Total: {cart?.totalPrice.toFixed(2)}$</h5>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-medium text-xl mt-5">Select Payment Method</h3>
                    <select className="px-2 py-1" value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                        <option value="CASH">Cash</option>
                        <option value="CARD">Card</option>
                    </select>
                </div>

                <BigBtn active={!isOrdering} handleClick={() => makeOrder()} customStyles="mt-8">{isOrdering ? 'Processing...' : 'Order'}</BigBtn>
            </div>
        </div>
    )
}
