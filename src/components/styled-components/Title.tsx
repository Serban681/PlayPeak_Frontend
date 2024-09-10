export const StyledLogo = ({customStyles, handleClick}: {customStyles?: string, handleClick?:() => void}) => {
    return (
        <div onClick={handleClick} className={customStyles}>
            <h1 className="my-auto font-title text-3xl text-black">C00L shop</h1>
            <div className="w-8 h-2.5 bg-pink inline-block translate-x-5 translate-y-[-0.5rem] rotate-12" />
        </div>
    )
}

export const SimpleLogo = ({customStyles}: {customStyles?: string, handleClick?:() => void}) => {
    return <h1 className={`${customStyles} my-auto font-title text-3xl text-white`}>C00L shop</h1>
}
