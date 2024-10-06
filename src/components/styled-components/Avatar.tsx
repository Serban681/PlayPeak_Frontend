import Avvvatars from "avvvatars-react";

export default function Avatar({customStyles, handleClick, email}: {customStyles?: string, handleClick?: () => void, email: string}) {
    return (
        <div onClick={handleClick} className={`cursor-pointer ${customStyles}`}>
            <Avvvatars size={36} value={email} style='shape' />
        </div>
        
        // <div onClick={handleClick}  />
    )
}
