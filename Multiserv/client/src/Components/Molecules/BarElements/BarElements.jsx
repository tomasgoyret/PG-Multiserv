const BarElements = ({ clase, arr }) => {
    return (
        <div className={clase}>
            {arr.map(elem => (<span>{elem}</span>))}
        </div>
    )
}


export default BarElements;