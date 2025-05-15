'use client'

import { BigBtn, SmallBtn, TagSystem } from "@/components/styled-components/Buttons";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import StockPredictionChart from "@/components/styled-components/StockPredictionChart";
import { ShopContext } from "@/context/ShopContext";
import useGetUser from "@/hooks/useGetUser";
import { addProductToCart } from "@/lib/cartRequests";
import { getProductById } from "@/lib/productRequests";
import { getVariancesForProduct, setQuantityForVariance } from "@/lib/productVarianceRequests";
import { Product } from "@/models/Product";
import { ProductVariance } from "@/models/ProductVariance";
import { useContext, useEffect, useState } from "react";

export default function ({ params }: { params: { id: number}}) {
    const [product, setProduct] = useState<Product>();
    const [variances, setVariances] = useState<ProductVariance[]>([]);
    const [error, setError] = useState('');

    const [selectedVariance, setSelectedVariance] = useState<ProductVariance | null>(null);

    const [quantity, setQuantity] = useState('')

    const { user } = useGetUser();

    const { cart, setCart, notifierState, setNotifierState } = useContext(ShopContext)!;

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

        setSelectedVariance(findVarianceByAttributes())
    }

    useEffect(() => {
        getProductById(params.id)
            .then(res => {
                setProduct(res)
                setSelectedAttributeValues(res.attributesAndAttributeValues.map(elem => ({attribute: elem.name, value: ''})))
            })
            .catch((err: Error) => setError(err.message));
        
        getVariancesForProduct(params.id) 
            .then(res => setVariances(res))
            .catch((err: Error) => setError(err.message))
    }, [])

    const canModify = () : boolean => {
        return selectedAttributeValues.every(elem => elem.value !== '') && !!quantity && Number(quantity) >= 0
    }

    const findVarianceByAttributes = () : ProductVariance | null => {
        for(let variance of variances) {
            if(variance.attributesAndValues.every(elem => selectedAttributeValues.some(selectedElem => selectedElem.attribute === elem.name && selectedElem.value === elem.value))) {
                setQuantity(String(variance.quantity))
                return variance
            }
        }

        return null
    }

    const modifyQuantity = () => {
        setQuantityForVariance(selectedVariance?.id!, Number(quantity))
            .then(res => {
                setVariances(variances.map(variance => {
                    if(variance.id === selectedVariance?.id!) {
                        return res
                    }

                    return variance
                }))

                setNotifierState({isError: false, message: "Updated Quantity Succesfully"})
            })
            .catch(err => setNotifierState({isError: true, message: "Something Went Wrong"}))
    }

    return (
        <div>
            {
                !!error ? <p>{error}</p>
            :
                <>
                    <SectionTitle customStyles="mt-10">{product?.name}</SectionTitle>
                    <div className="flex flex-col md:flex-row justify-around mt-8">
                        <div className="w-full md:w-2/5">
                            <img className="w-full" src={product?.photoUrl} alt={product?.name} />
                            <StockPredictionChart customStyles="mt-20" />
                        </div>
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

                            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="focus:outline-none focus:border-black border-2 rounded-xl py-1 px-2 mb-3 mr-2 mt-5 font-light w-12"  />
                            <SmallBtn handleClick={modifyQuantity} active={canModify()}>Modify Quantity</SmallBtn>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
