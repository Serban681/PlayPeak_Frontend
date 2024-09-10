'use client'

import { BigBtn, TagSystem } from "@/components/styled-components/Buttons";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import { ShopContext } from "@/context/ShopContext";
import { addProductToCart } from "@/lib/cartRequests";
import { getProductById } from "@/lib/productRequests";
import { Product } from "@/models/Product";
import { selectUser } from "@/store/userSlice";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProductPage({ params }: { params: { id: number}}) {

    const [product, setProduct] = useState<Product>();
    const [error, setError] = useState<string>('');

    const user = useSelector(selectUser);

    const { cart, setCart, setNotifierState } = useContext(ShopContext)!;

    const [selectedAttributeValues, setSelectedAttributeValues] = useState<{
        attribute: string,
        value: string
    }[]>([]);
    const [groupedSelectedAttributeValues, setGroupedSelectedAttributeValues] = useState<string[]>([]);

    const handleAttributeValueSelection = (attribute: string, attributeValue: string) => {
        let newSelectedAttributeValues = selectedAttributeValues.map(elem => {
            if(elem.attribute === attribute) {
                elem.value = attributeValue
            }
            return elem
        })
        setSelectedAttributeValues(newSelectedAttributeValues)
        setGroupedSelectedAttributeValues(newSelectedAttributeValues.map(elem => elem.value))   
    }

    useEffect(() => {
        getProductById(params.id)
            .then(res => {
                setProduct(res)
                setSelectedAttributeValues(res.attributesAndAttributeValues.map(elem => ({attribute: elem.name, value: ''})))
            })
            .catch((err: Error) => setError(err.message));
    }, [])

    const findCartEntryInCart = (productId: number) : number => {
        cart?.cartEntries.forEach(cartEntry => {
            if(cartEntry.product.id === productId) {
                return cartEntry.id
            }
        })

        return -1
    }

    const canOrder = () : boolean => {
        return selectedAttributeValues.every(elem => elem.value !== '')
    }

    const addToCartToggle = (productId: number) => {
        if(user.id === -1) {
            setNotifierState({message: 'You need to be logged in to order products'})
            return
        }

        let cartEntryId = findCartEntryInCart(productId)

        if(canOrder() && cartEntryId === -1) {
            addProductToCart(productId, cart!.id)
                .then(res => setCart(res))
        }
    }

    return (
        <div>
            {
                !!error ? <p>{error}</p>
            :
                <>
                    <SectionTitle customStyles="mt-10">{product?.name}</SectionTitle>
                    <div className="flex flex-col md:flex-row justify-around mt-8">
                        <img className="w-full md:w-2/5" src={product?.photoUrl} alt={product?.name} />
                        <div>
                            {product?.attributesAndAttributeValues.map((attribute, index) => (
                                <div key={index}>
                                    <h5 className="font-medium text-xl capitalize">{attribute.name}</h5> 
                                    <div>
                                        <TagSystem
                                            tags={attribute.values}
                                            selectedTags={groupedSelectedAttributeValues}
                                            handleTagSelection={(attributeValue) => handleAttributeValueSelection(attribute.name, attributeValue)}
                                            customStyles="mr-5"
                                            />
                                    </div>
                                </div>
                            ))}
                            <BigBtn handleClick={() => addToCartToggle(product?.id!)} active={canOrder()} customStyles="mt-8">Add to cart</BigBtn>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
