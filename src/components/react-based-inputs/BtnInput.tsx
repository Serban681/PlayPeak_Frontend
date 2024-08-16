const BtnInput = ({text, submit=false, handleClick, customStyles, formValid=true}: {text: string, submit?: boolean, handleClick: (e: React.FormEvent) => void, customStyles?: string, formValid?: boolean}) => {
    return (
        <button disabled={!formValid} className={`${customStyles} border-2 p-1`} type={submit ? "submit" : "button"} onClick={handleClick}>{text}</button>
    );
}

export default BtnInput;
