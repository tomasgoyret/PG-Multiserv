/** @jsxImportSource @emotion/react */
import React from "react";
import tomas from "../../../src/assets/fotos/tomas.jpeg"
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
                                        style={{backgroundImage: `url(${data.imagen ? data.imagen : "https://indiehoy.com/wp-content/uploads/2018/09/nicolas-cage-meme-1200x900.jpg"})`, backgroundSize: "cover", backgroundPosition: "center"}}
                                    >
                                        
                                    </div>
                                    <span className="text-xl font-semibold font-sans">{data.displayName}</span>
                                    <span className="text-md font-semibold font-sans text-gray-500">{data.titulo}</span>
                                    <div className="w-full flex justify-center mx-2 py-4">
                                        <div className="mx-2 h-9 w-9 rounded-md overflow-hidden transition-all ease-in-out duration-300 transform  hover:translate-y-1 hover:scale-125 hover:shadow-lg">
                                            <a href={data.redes[0].url} target="_blank">
                                                <img src={data.redes[0].icon} alt="" />
                                            </a>
                                        </div>
                                        <div className="mx-2 h-9 w-9 rounded-md overflow-hidden transition-all ease-in-out duration-300 transform  hover:translate-y-1 hover:scale-125 hover:shadow-lg">
                                            <a href={data.redes[1].url} target="_blank">
                                                <img src={data.redes[1].icon} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="py-4 w-full flex justify-center bg-gray-50">
                    <figure
                        css={{
                            width: '600px',
                            '@media (max-width: 640px)': {
                                width: '100%'
                            }
                        }}
                        className="md:flex bg-white rounded-xl p-8 md:p-0 shadow-xl border border-gray-100">
                        <img src={tomas} className="w-32 h-32 md:w-48 md:h-auto rounded-full md:rounded-none md:rounded-l-xl mx-auto object-cover" width="384" height="512" />
                        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                            <blockquote>
                                <p className="text-lg font-semibold">
                                    "...pues para la primer demo solamente tenemos un h1 que dice <span className="italic">Bienvenido a MultiServ</span>"
                                </p>
                            </blockquote>
                            <figcaption class="font-medium">
                                <div class="text-cyan-600">
                                    Tomás Goyret
                                </div>
                                <div class="text-gray-500">
                                    Full-Stack Developer
                                </div>
                            </figcaption>
                        </div>
                    </figure>
                </div>
            </div>
        </div>
    )
}


export default Nosotros;
