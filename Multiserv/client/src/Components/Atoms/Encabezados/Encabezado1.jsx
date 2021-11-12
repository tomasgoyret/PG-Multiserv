const Encabezado1 = ({ clases, titulo }) => {
    return (
        <div>
            <h2 className={`${clases} text-6xl font-bold`} >{titulo}</h2>
        </div>
    )
}

export default Encabezado1