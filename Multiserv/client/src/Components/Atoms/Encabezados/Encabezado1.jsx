const Encabezado1 = ({ clases, titulo }) => {
    return (
        <div>
            <h2 className={`${clases} font-bold`} >{titulo}</h2>
        </div>
    )
}

export default Encabezado1