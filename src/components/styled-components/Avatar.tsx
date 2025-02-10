import { User } from "@/models/User";
import Avvvatars from "avvvatars-react";

export default function Avatar({customStyles, handleClick, user}: {customStyles?: string, handleClick?: () => void, user: User}) {
    return (
        <div onClick={handleClick} className={`cursor-pointer ${customStyles}`}>
            {
                user.profileImageUrl ? 
                    <img src={user.profileImageUrl} alt="avatar" className="w-9 h-9 rounded-full object-cover" /> 
                :
                    <Avvvatars size={36} value={user.email} style='shape' />
            }
        </div>
    )
}
