import React from "react";
import { useNavigate } from "react-router";
import { AiFillHome } from "react-icons/ai";

const Nosotros = () => {
    const navigate = useNavigate()

    return(
        <div className="w-full h-screen">
            <div className="w-full border-2 pb-3">
                <button 
                    onClick={() => navigate("/")} 
                    className="flex  text-gray-700 text-3xl font-semibold items-end ml-3 pr-2 mt-3"  
                ><AiFillHome size='32' color='gray-700' /></button>
            </div>
            <div className="w-full h-5/6 flex flex-col item-center">
                <div className="flex flex-col items-center mt-6 h-1/6">
                    <span className="text-4xl font-sans font-semibold">Nuestro equipo</span>
                </div>
                <div className="w-full border-2 h-5/6">
                    <div className="w-72 h-52 border-2 flex flex-col items-center shadow-lg py-2">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400 bg-gray-200">
                            
                        </div>
                        
                        <div className="">
                            <div className=""></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Nosotros;