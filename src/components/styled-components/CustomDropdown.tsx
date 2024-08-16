export const CustomDropdown = ({label, name, options, selected, handleSelect, customStyles}: 
    {label: string, name: string, options: string[], selected: string, handleSelect: (name: string, selected: string) => void, customStyles?: string}) => {
    return (
        <label className={`${customStyles} color font-medium text-sm`}>
            {label}: <span/>
            <select className="bg-black text-white font-medium rounded-full pl-4 h-8 text-sm" name={name} value={selected} onChange={(e) => handleSelect(name, e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </label>
    );
}
