import { ReactNode } from "react"

export const SectionTitle = ({customStyles, children}: 
        {customStyles?: string, children: ReactNode}) => {
    return (
        <span className={`block ${customStyles}`}>
            <div className="w-2 h-5 mr-1 bg-pink inline-block" />
            <h2 className="font-medium text-2xl inline-block">
                {children}
            </h2>
        </span>
    )
}
