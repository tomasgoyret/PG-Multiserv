import React from "react";
import Encabezado2 from "../../Atoms/Encabezados/Encabezado2";
import Parrafo from "../../Atoms/Parrafo/Parrafo";

const Saludo = ({classDivSaludo, textoParrafo}) => {
    return(
        <div className={classDivSaludo}>
            <Encabezado2 />
            <Parrafo parrafo={textoParrafo}/>
        </div>
    )
}

export default Saludo;