export const StyledTitle = ({customStyles}: {customStyles?: string}) => {
    return (
        <div className={customStyles}>
            <h1 className="my-auto font-title text-3xl text-black">C00L shop</h1>
            <div className="w-8 h-2.5 bg-pink inline-block translate-x-5 translate-y-[-0.5rem] rotate-12" />
        </div>
    )
}
