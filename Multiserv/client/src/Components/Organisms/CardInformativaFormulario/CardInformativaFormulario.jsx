import React from "react";
import Encabezado2 from "../../Atoms/Encabezados/Encabezado2";
import Parrafo from "../../Atoms/Parrafo/Parrafo";
import ButtonXartiago from "../../Atoms/ButtonXartiago/ButtonXartiago";

const CardInfomativaFormulario = () => {
    return(
        <div className="flex flex-col items-center justify-center h-full">
            <Encabezado2 
                clases="text-white"
                titulo="Bienvenidos"
            />
            <Parrafo 
                classDivParrafo="w-4/5 mt-2 mb-5"
                classParrafo="text-gray-200" 
                parrafo="Lorem Ipsum is simply dummy text of the printing and typesetting industry" 
            />
           <ButtonXartiago 
                btn="Regregar"
                page=""
                clase="w-2/5"
                btnClass="font-semibold text-gray-50 flex w-full flex-nowrap bg-green-700 p-2 py-2 px-4 justify-center items-center rounded-md"
           />
        </div>
    )
}

export default CardInfomativaFormulario;