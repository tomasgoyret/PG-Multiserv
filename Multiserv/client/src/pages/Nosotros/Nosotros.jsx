import React from "react";
import dataNosotros from "./dataNosotros";
import { useNavigate } from "react-router";
import { AiFillHome } from "react-icons/ai";

const Nosotros = () => {
    const navigate = useNavigate()

    return(
        <div className="w-full h-screen">
            <div className="w-full pb-3">
                <button 
                    onClick={() => navigate("/")} 
                    className="flex  text-gray-700 text-3xl font-semibold items-end ml-3 pr-2 mt-3"  
                ><AiFillHome size='32' color='gray-700' /></button>
            </div>
            <div className="w-full h-5/6 flex flex-col item-center">
                <div className="flex flex-col items-center mt-6 h-1/6">
                    <span className="text-4xl font-sans font-semibold">Nuestro equipo</span>
                </div>
                <div className="w-full flex flex-wrap justify-around py-5">
                    {
                        dataNosotros?.map(data => {
                            return(
                                <div className="w-96 h-64 flex flex-col items-center shadow-xl justify-center rounded-lg my-5 transition-all ease-in-out duration-300 transform hover:translate-x-1 hover:translate-y-1 hover:scale-105 hover:drop-shadow-xl hover:bg-gray-100 ">
                                    <div className="w-20 h-20 rounded-full overflow-hidden  mb-2 shadow-md"
                                        style={{backgroundImage: `url(${data.imagen})`, backgroundSize: "cover", backgroundPosition: "center"}}
                                    >
                                        
                                    </div>
                                    <span className="text-xl font-semibold font-sans">{data.displayName}</span>
                                    <span className="text-md font-semibold font-sans text-gray-500">{data.titulo}</span>
                                    <div className="w-full flex justify-center mx-2 py-4">
                                        <div className="mx-2 h-9 w-9 rounded-md overflow-hidden transition-all ease-in-out duration-300 transform  hover:translate-y-1 hover:scale-125 hover:shadow-lg">
                                            <a href={data.redes[0].url}>
                                                <img src={data.redes[0].icon} alt="" />
                                            </a>
                                        </div>
                                        <div className="mx-2 h-9 w-9 rounded-md overflow-hidden transition-all ease-in-out duration-300 transform  hover:translate-y-1 hover:scale-125 hover:shadow-lg">
                                            <a href={data.redes[1].url}>
                                                <img src={data.redes[1].icon} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default Nosotros;