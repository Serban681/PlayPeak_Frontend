export function SmallTag({value, customStyles} : {value: string, customStyles?: string}) {
    return (
        <div className={`${customStyles} inline text-sm py-1 px-2 rounded-full bg-black text-white mr-2`} >
            {value}
        </div>
    )
}

export function Tag({value}: {value: string}) {
    return (
        <div className="inline py-1 px-2 rounded-full bg-black text-white mr-2" >
            {value}
        </div>
    )
}
