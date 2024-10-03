import { LegacyRef } from "react";
import { FieldValues, useController, UseControllerProps, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface TextInput<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
    label: string;
    customStyles?: string;
}

export default function TextInput<T extends FieldValues>({label, customStyles, ...args}: TextInput<T>) {
    const { field, fieldState } = useController(args);
    return (  
        <label className="block my-2">
            {label}:<br/>
            <input className={`${customStyles} border-2`} {...field} />
            {fieldState.invalid && <div className="inline-block mb-1 ml-2 w-2 h-2 bg-red-400 rounded-sm" /> }
        </label>   
    );
}

export function RawTextInput({label, customStyles, name, value, handleChange, readOnly}: {label:string, customStyles: string, name: string, value: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, defaultValue?: string, readOnly?: boolean}) {
    return (
        <label className="block my-2">
            {label}:<br/>
            <input 
                className={`${customStyles} border-2 outline-none`}
                name={name}
                value={value}
                onChange={handleChange}
                readOnly={readOnly}
            />
        </label>
    )
}
