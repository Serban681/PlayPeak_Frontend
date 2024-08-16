'use client'

import React from "react";

const FormCheckInput = ({label, name, checked, handleCheck} : {label: string, name: string, checked: boolean, handleCheck: (name: string, checked: boolean) => void}) => {
    return (
        <label className="block my-2">
            {label}: <span/>
            <input type="checkbox" name={name} checked={checked} onChange={(e) => handleCheck(name, e.target.checked)} />
        </label>
    );

}

export default FormCheckInput
