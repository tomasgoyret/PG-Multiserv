const Encabezado3 = ({ clases, titulo }) => {
    return (
        <div>
            <h4 className={`${clases} text-4xl font-semibold`}>{titulo}</h4>
        </div>
    )
}

export default Encabezado3