import { FieldValues, useController, UseControllerProps, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface TextInput<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
    label: string;
}

export default function TextInput<T extends FieldValues>({label, ...args}: TextInput<T>) {
    const { field, fieldState } = useController(args);
    return (  
        <label className="block my-2">
            {label}:<br/>
            <input className="border-2"  {...field} />
            {fieldState.invalid && <div className="inline-block mb-1 ml-2 w-2 h-2 bg-red-400 rounded-sm" /> }
        </label>   
    );
}
