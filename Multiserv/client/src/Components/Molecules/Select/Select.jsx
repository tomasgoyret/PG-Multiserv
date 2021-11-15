const Select = ({ arr, defaultSelect, clase, typeSelect, callback }) => {
    return (
        <div>
            <span>{typeSelect}:</span>
            <select onChange={callback} className={clase} name={defaultSelect} value={defaultSelect} placeholder={defaultSelect} >
                <option selected >...</option>
                {arr.map((option, i) => (
                    <option className="inline-flex" key={i} value={option} name={option} >{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Select