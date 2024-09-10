export default function Tag({value}: {value: string}) {
    return (
        <div className="inline py-1 px-2 rounded-full bg-black text-white mr-2" >
            {value}
        </div>
    )
}
