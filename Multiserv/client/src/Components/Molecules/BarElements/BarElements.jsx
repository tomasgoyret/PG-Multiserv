const BarElements = ({ clase, arr }) => {
    return (
        <div className={clase}>
            {arr.map((elem, i ) => (<span key={i} >{elem}</span>))}
        </div>
    )
}


export default BarElements;