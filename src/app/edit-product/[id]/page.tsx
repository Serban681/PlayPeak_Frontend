'use client'

import { SmallBtn, TagSystem } from "@/components/styled-components/Buttons";
import { SectionTitle } from "@/components/styled-components/SectionTitle";
import StockPredictionChart from "@/components/styled-components/ChartsWrapper";
import { ShopContext } from "@/context/ShopContext";
import { getProductById } from "@/lib/productRequests";
import { generateNewVarianceDemandPrediction, getVariancesDemandPrediction } from "@/lib/productVarianceDemandRequests";
import { getVariancesForProduct, setQuantityForVariance } from "@/lib/productVarianceRequests";
import { Product } from "@/models/Product";
import { ProductVariance } from "@/models/ProductVariance";
import { DemandPrediction, ProductVarianceDemand } from "@/models/ProductVarianceDemand";
import { useContext, useEffect, useState } from "react";
import { SmallTextInput } from "@/components/styled-components/FormInput";
import { useForm } from "react-hook-form";

export default function ({ params }: { params: { id: number}}) {
    const [product, setProduct] = useState<Product>();
    const [variances, setVariances] = useState<ProductVariance[]>([]);
    const [error, setError] = useState('');

    const [selectedVariance, setSelectedVariance] = useState<ProductVariance | null>(null);

    const [quantity, setQuantity] = useState('')

    const { setNotifierState } = useContext(ShopContext)!;

    const [selectedAttributeValues, setSelectedAttributeValues] = useState<{
        attribute: string,
        value: string
    }[]>([]);
    const [groupedSelectedAttributeValues, setGroupedSelectedAttributeValues] = useState<string[]>([]);

    const [productVariancesDemands, setProductVariancesDemands] = useState<ProductVarianceDemand[]>([])

    const [selectedDemandPrediction, setSelectedDemandPrediction] = useState<DemandPrediction[]>([])

    const [generatingPredictions, setGeneratingPredictions] = useState<boolean>(false)

    const { handleSubmit, control } = useForm<{
        daysToPredict: string,
        totalDays: string
    }>({
        defaultValues: {
            daysToPredict: "",
            totalDays: ""
        },
        mode: "all",
    });

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

        getVariancesDemandPrediction(params.id)
            .then(res => {
                setProductVariancesDemands(res)
            })
            .catch((err: Error) => setError(err.message))
    }, [])

    const canModify = () : boolean => {
        return selectedAttributeValues.every(elem => elem.value !== '') && !!quantity && Number(quantity) >= 0
    }

    const findVarianceByAttributes = () : ProductVariance | null => {
        for(let variance of variances) {
            if(variance.attributesAndValues.every(elem => selectedAttributeValues.some(selectedElem => selectedElem.attribute === elem.name && selectedElem.value === elem.value))) {
                setQuantity(String(variance.quantity))
                const foundDemandPredictions = productVariancesDemands.find(demand => demand.productVariance.id === variance.id)?.demandPredictions;
                setSelectedDemandPrediction(foundDemandPredictions ? foundDemandPredictions : []);
                return variance
            }
        }

        return null
    }

    const generateNewPrediction = handleSubmit(async (data) => {      
        if(!!data.totalDays && !!data.daysToPredict && parseInt(data.totalDays) > parseInt(data.daysToPredict)) {
            setGeneratingPredictions(true)
            generateNewVarianceDemandPrediction(selectedVariance?.id!, Number(data.daysToPredict), Number(data.totalDays))
                .then(res => {
                    setSelectedDemandPrediction(res.demandPredictions)
                    setProductVariancesDemands(prev =>
                        prev.map(item =>
                            item.productVariance.id === res.productVariance.id
                            ? { ...item, ...res }
                            : item
                        )
                    );
                })
                .catch(async err => await setNotifierState({ isError: true, message: err.message}))
                .finally(() => setGeneratingPredictions(false))
        } else {
            setNotifierState({
                message: "Invalid inputs for prediction generation",
                isError: true 
            })
        }
    })

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
                    <div className="flex flex-col md:flex-row justify-between mt-8">
                        <div className="w-full md:w-2/5">
                            <img className="w-full" src={product?.photoUrl} alt={product?.name} />
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

                    <div className={`${!!!selectedVariance && 'hidden'} flex flex-col md:flex-row justify-between mt-20`}>
                        <div>
                            <h1 className="font-medium text-xl">Possible Amount of Orders in the Future</h1>
                        </div>
                        <div className="flex items-center">
                            <SmallTextInput customStyles="mr-2" label="Days To Predict" control={control} name="daysToPredict" rules={{ required: true }} />
                            <SmallTextInput customStyles="mr-4" label="Total Days" control={control} name="totalDays" rules={{ required: true }} />
                            <SmallBtn handleClick={generateNewPrediction} active={!generatingPredictions}>Generate New Predictions</SmallBtn>
                        </div>
                    </div>
                    

                    <StockPredictionChart customStyles="-ml-14 mt-10 hidden md:block" demandPrediction={selectedDemandPrediction} />
                </>
            }
        </div>
    )
}
