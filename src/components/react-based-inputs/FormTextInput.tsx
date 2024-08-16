'use client'

export default function FormTextInput({ label, type, name, value, changeFn, addValidation=false, validated=false}: { label: string, type: string, name:string, value: string, changeFn: (name: string, value: string) => void, addValidation?: boolean, validated?: boolean }) {
    return (  
        <label className="block my-2">
            {label}:<br/>
            <input className="border-2" type={type} value={value} onChange={(e) => changeFn(name, e.target.value)} />
            {addValidation && !validated && <div className="inline-block mb-1 ml-2 w-2 h-2 bg-red-400 rounded-sm" /> }
        </label>   
    );
}
