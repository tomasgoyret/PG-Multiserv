import React from "react";
import Encabezado2 from "../../Atoms/Encabezados/Encabezado2";
import Parrafo from "../../Atoms/Parrafo/Parrafo";
import Saludo from "../../Molecules/Saludo/Saludo";

const CardInfomativaFormulario = () => {
    return(
        <div className="flex flex-col items-center justify-center h-full">
            <Encabezado2 
                clases="text-white"
                titulo="Bienvenidos"
            />
            <Parrafo 
                classDivParrafo="w-4/5 mt-2"
                classParrafo="text-gray-200" 
                parrafo="Lorem Ipsum is simply dummy text of the printing and typesetting industry" 
            />
        </div>
    )
}

export default CardInfomativaFormulario;