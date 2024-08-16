import { ReactNode } from "react";

export const BigBtn = (
        {children, submit=false, handleClick, customStyles}: 
        {children: ReactNode, submit?: boolean, handleClick?: (e: React.FormEvent) => void, customStyles?: string}
    ) => {
        return (
            <button className={`${customStyles} bg-black text-white font-medium rounded-full text-md px-10 h-11 hover:scale-110`} type={submit ? "submit" : "button"} onClick={handleClick}>{children}</button>
        );
}

const TagBtn = ({text, selected, handleClick, customStyles}: 
    {text: string, selected: boolean, handleClick: (e: React.FormEvent) => void, customStyles?: string}) => 
        {
            return (
                <button className={`${customStyles} rounded-full px-5 font-medium h-8 text-sm hover:scale-110 ${selected ? "bg-black text-white" : "bg-light-gray text-dark-gray"}`} onClick={handleClick}>
                    {text}
                </button>
            )
}

export const TagSystem = ({tags, selectedTags, handleTagSelection, customStyles}: 
        {tags: string[], selectedTags: string[], handleTagSelection: (tag: string ) => void, customStyles?: string}) => {
    return (
        <div className={`${customStyles}`}>
            {tags.map((tag, index) => (
                <TagBtn 
                    key={index} 
                    text={tag} 
                    selected={selectedTags.includes(tag)} 
                    handleClick={() => handleTagSelection(tag)} 
                    customStyles="mr-3 mb-3" />
            ))}
        </div>
    )
}
