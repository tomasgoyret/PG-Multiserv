import React from "react";
import Encabezado2 from "../../Atoms/Encabezados/Encabezado2";
import Parrafo from "../../Atoms/Parrafo/Parrafo";
import ButtonXartiago from "../../Atoms/ButtonXartiago/ButtonXartiago";

const CardInfomativaFormulario = () => {
    return(
        <div className="flex flex-col items-center justify-center h-full">
            <div className="my-4">
                <ButtonXartiago
                    btn="Volver"
                    page=""
                    btnClass="font-semibold inline-flex w-32 flex-nowrap bg-gray-50 text-gray-900 py-2 px-4 text-lg justify-center items-center rounded-md hover:bg-gray-100 active:bg-white transition-all ease-in-out duration-300"
                />
            </div>
            <Encabezado2 
                clases="text-white"
                titulo="Bienvenidos"
            />
            <Parrafo 
                classDivParrafo="w-4/5 mt-2 mb-5"
                classParrafo="text-gray-200" 
                parrafo="Lorem Ipsum is simply dummy text of the printing and typesetting industry" 
            />
            <div className="text-center flex flex-col mb-4">
                <h2 className="font-semibold text-white">¿No tienes cuenta?</h2>
            </div>
            <ButtonXartiago
                btn="Registrarte"
                page="signup"
                btnClass="font-semibold inline-flex w-32 text-lg px-4 py-2 bg-green-700 text-gray-50 hover:bg-green-800 active:bg-green-600 rounded-md transition-all ease-in-out duration-300"
            />
        </div>
    )
}

export default CardInfomativaFormulario;