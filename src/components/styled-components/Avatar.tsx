export default function Avatar({customStyles, handleClick}: {customStyles?: string, handleClick?: () => void}) {
    return (
        <div onClick={handleClick} className={`cursor-pointer w-10 h-10 bg-pink rounded-full ${customStyles}`} />
    )
}
