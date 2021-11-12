const Encabezado2 = ({ clases, titulo }) => {
    return (
        <div>
            <h3 className={`${clases} text-5xl font-bold`}>{titulo}</h3>
        </div>
    )
}

export default Encabezado2