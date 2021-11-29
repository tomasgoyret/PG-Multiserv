import React from "react";
import { useNavigate } from "react-router";
import { AiFillHome } from "react-icons/ai";

const NotFound404 = () => {
    const navigate = useNavigate()

    return(
        <div className="w-full h-screen">
            <div className="w-full h-1/6">
                <button 
                    onClick={() => navigate("/home")} 
                    className="flex  text-gray-700 text-3xl font-semibold items-end ml-3 pr-2 mt-3"  
                ><AiFillHome size='32' color='gray-700' /></button>
            </div>
            <div className="w-full h-5/6 flex flex-col item-center">
                <div className="flex flex-col items-center mt-6">
                    <span className="text-9xl font-sans font-semibold">404</span>
                    <span className="text-2xl font-sans font-semibold py-5">Not Found!</span>
                    <span className="text-md font-sans text-gray-600 py-2">La pagina solicitada no existe! Te invitamos a volver al Home</span>
                </div>
                <div className="w-full flex justify-center py-8">
                    <button
                        className="flex justify-center items-center mx-2 font-semibold  w-auto text-xl px-8 py-3 bg-green-500 text-gray-50 hover:bg-green-700 focus:bg-green-700 rounded-md transition-all ease-in-out duration-300"
                        onClick={() => navigate("/home")}
                    >
                    Regresar
                    </button>
                </div>
            </div>
        </div>
    )
}


export default NotFound404;