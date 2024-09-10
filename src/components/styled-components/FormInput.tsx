import { FieldValues, useController, UseControllerProps } from "react-hook-form";

interface TextInput<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
    label: string;
}

// interface CheckInput<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
//     label: string;
// }

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
