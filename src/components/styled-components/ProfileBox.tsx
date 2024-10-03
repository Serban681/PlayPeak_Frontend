import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { selectUser, setUser } from "@/store/userSlice";
import { BigBtn, SmallBtn } from "./Buttons";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/lib/hooks";

export default function ProfileBox({handleCloseBtnClick}: {handleCloseBtnClick: () => void}) {
    const user = useSelector(selectUser);
    const router = useRouter();

    const dispatch = useAppDispatch();

    const signOut = () => {
        dispatch(setUser({id: -1, email: '', firstName: '', lastName: '', role: ''}));
        router.push('/');
    }

    return (
        <div className='w-[16.4rem] h-32 top-4 right-4 absolute bg-white border-2 border-solid border-black rounded-3xl'>
            <div className="absolute right-3 top-3">
                <XMarkIcon onClick={() => handleCloseBtnClick()} className="hover:scale-125 cursor-pointer size-5" />
            </div>
            <div className="ml-4 mt-4">
                <div className="flex">
                    <Avatar />
                    <div className="ml-3">
                        <h5 className="font-medium">{user.firstName} {user.lastName}</h5>
                        <h5 className="text-xs">{user.email}</h5>
                    </div>
                </div>
                <div className="flex mt-5">
                    <SmallBtn handleClick={() => signOut()}>Sign Out</SmallBtn>
                    <SmallBtn handleClick={() => router.push('/profile')} customStyles={'ml-3'} whiteBtn>View Profile</SmallBtn>
                </div>
            </div>
        </div>
    )
}
