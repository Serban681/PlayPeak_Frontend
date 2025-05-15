'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { CartEntry } from '@/models/CartEntry'
import { useContext } from 'react';
import { ShopContext } from '@/context/ShopContext';
import { addProductToCart, removeProductFromCart, updateCartEntryQuantity } from '@/lib/cartRequests';
import { SmallTag } from './Tag';
import { Cart } from '@/models/Cart';

const CartEntryComponent = ({ customStyles, cartEntry, cart }: { customStyles: string, cartEntry: CartEntry, cart: Cart }) => {
    const { setCart, notifierState, setNotifierState } = useContext(ShopContext)!;

    const increaseQuantity = (e: any) => {
        addProductToCart(cartEntry.productVariance.id, cart.id)
            .then(async res => await setCart(res))
            .catch(err => setNotifierState({ ...notifierState, message: err.message }))
    }
    
    const decreaseQuantity = (e: any) => {
        if(cartEntry.quantity === 1) {
            removeProductFromCart(cartEntry.id)
                .then(async res => await setCart(res))
                .catch(async err => await setNotifierState({ ...notifierState, message: err }))

            return
        }
        updateCartEntryQuantity(cartEntry.id, cartEntry.quantity -1)
            .then(async res => await setCart(res))
            .catch(async err => await setNotifierState({ ...notifierState, message: err }))
    }

    const removeCartEntry = (e: any) => {
        removeProductFromCart(cartEntry.id)
            .then(async res => await setCart(res))
            .catch(async err => await setNotifierState({ ...notifierState, message: err }))
    }

    return (
        <div className={`${customStyles} px-4 w-full h-24 border-2 border-black shadow-big rounded-3xl flex justify-between items-center`}>
            <div className="text-xl font-medium">
                <h5 className="inline-block md:inline mr-3 text-sm w-8 md:w-full lg:text-xl">{cartEntry.productVariance.product.name}</h5>
                <img className="w-12 hidden md:inline" src={cartEntry.productVariance.product.photoUrl} />
                <div className='hidden lg:inline'>{ cartEntry.productVariance.attributesAndValues.map((attributeAndValue, index) => <SmallTag key={index} value={attributeAndValue.value} customStyles='ml-2' />) }</div> 
            </div>
            <div className='xl:absolute xl:left-1/2 xl:-translate-x-1/2'>
                <h5 className="mr-4 text-base font-medium hidden lg:inline">Price: {cartEntry.productVariance.product.price.toFixed(2)}$ * <span className="bg-black text-white p-1">{cartEntry.quantity}</span> = {cartEntry.totalPrice.toFixed(2)}$</h5>
                <h5 className="mr-4 text-base font-medium inline lg:hidden">Qty: <span className="bg-black text-white p-1">{cartEntry.quantity}</span></h5>
                <button onClick={decreaseQuantity} className="mr-2 hover:scale-110 translate-y-[-0.1rem] bg-black inline-flex justify-center items-center text-white text-xl font-medium rounded-full w-8 h-8">
                    <div className="w-3 h-[0.2rem] bg-white"></div>
                </button>
                <button onClick={increaseQuantity} className="translate-y-1 hover:scale-110 bg-black inline-flex justify-center items-center text-white text-xl font-medium rounded-full w-8 h-8">
                    <div>
                        <div className="translate-y-[0.35rem] w-3 h-[0.2rem] bg-white"></div>
                        <div className="translate-x-[0.3rem] translate-y-[-0.1rem] w-[0.2rem] h-3 bg-white"></div>
                    </div>
                </button>
            </div>
            <div>
                <div className="scale-150">
                    <XMarkIcon onClick={() => removeCartEntry(cartEntry.id)} className="hover:scale-125 cursor-pointer size-5" />
                </div>
            </div>
        </div>
    )
}

export default CartEntryComponent;
