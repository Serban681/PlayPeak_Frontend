'use client'

// import Btn from "@/components/form-hook-lib-inputs/Btn";
import TextInput from "@/components/form-hook-lib-inputs/Input";
import { Product } from "@/models/Product";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

// type ProductMainDetails = {
//     name: string,
//     price: number,
//     category: string
// }

export default function Page() {
    // const router = useRouter();

    // const { handleSubmit, control, setValue, getValues } = useForm<Product>({
    //     defaultValues: {
    //         name: "",
    //         price: 0,
    //         category: "",
    //         attributesAndAttributeValues: []
    //     },
    //     mode: "all"
    // });

    // const { fields, remove, append } = useFieldArray({
    //     name: "attributesAndAttributeValues",
    //     control
    // })

    // const onSubmit = handleSubmit(async (data) => {
    //     console.log(data);
    // });

    // const addAttribute = () => {
    //     append({name: "", values: []});
    // }

    // const removeAttribute = () => {
    //     remove(fields.length - 1);
    // }

    // const AttributeAndValuesComponent = ({attribute, index}: {attribute: {name: string, values: string[]}, index: number}) => {
    //     return (
    //         <div>
    //             <TextInput label="Attribute name" control={control} name={`attributesAndAttributeValues.${index}.name`} rules={{ required: true }} />
    //             <h2>Attribute Values</h2>
    //             {attribute.values.map((value, valueIndex) => (
    //                 <div key={valueIndex}>
    //                     <TextInput label="Value" control={control} name={`attributesAndAttributeValues.${index}.values.${valueIndex}`} rules={{ required: true }} />
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }

    // return (
    //     <>
    //         <h1>Add Product</h1>

    //         <form onSubmit={onSubmit}>
    //             <TextInput label="Name" control={control} name="name" rules={{ required: true }} />
    //             <TextInput label="Price" control={control} name="price" rules={{ required: true }} />
    //             <TextInput label="Category" control={control} name="category" rules={{ required: true }} />

    //             {getValues('attributesAndAttributeValues').map((attribute, index) => (
    //                 <AttributeAndValuesComponent key={index} attribute={attribute} index={index} />
    //             ))}

    //             <Btn customStyles="block mb-3" handleClick={addAttribute}>+</Btn>
    //             <Btn customStyles="block mb-3" handleClick={removeAttribute}>-</Btn>

    //             <Btn submit>Submit</Btn>
    //         </form>
    //     </>
    // )
    return (
        <></>
    )
}


