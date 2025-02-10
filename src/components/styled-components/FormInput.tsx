import React, { useState } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

interface TextInput<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
    label: string;
}

interface RadioInput {
    label: string;
    options: string[];
    values: string[];
    currentValue: string;
    setCurrentValue: (e: any) => void;
}

export function TextInput<T extends FieldValues>({label, ...args}: TextInput<T>) {
    const { field, fieldState } = useController(args);
    return (  
        <label className="block my-2 text-xl font-medium">
            {label}:<br/>
            <input className="focus:outline-none focus:border-black border-2 rounded-xl py-1 px-2 mb-3 font-light"  {...field} />
        </label>   
    );
}

export function CheckInput<T extends FieldValues>({label, ...args}: TextInput<T>) {
    const { field } = useController(args);
    return (
        <label className="block my-2 text-xl font-medium">
            {label}: <span/>
            <input className="w-4 h-4" type="checkbox" {...field} />
        </label>
    );
}

export function RadioInput({label, options, values, currentValue, setCurrentValue}: RadioInput) {
    const [localCurrentValue, localSetCurrentValue] = useState<string>(currentValue);

    const handleValueChange = (e: any) => {
        setCurrentValue(e);
        localSetCurrentValue(e.target.value);
    }

    return (
        <label className="block my-2 text-xl font-medium">
            {label}: <span/><br />
            {options.map((option, index) => (
                <span className="mr-2" key={index}>
                    <input className="w-4 h-4 mr-2 " type="radio" checked={localCurrentValue === values[index]} value={values[index]} onClick={handleValueChange} />
                    {option}
                </span>
            ))}
        </label>
    );
}
