import React, { useState } from "react";
import Input from "../../Components/Atoms/Input/Input";

const Profile = () => {
    const[editarPerfil, setEditarPerfil] = useState("informacion");

    const cambiarAInformacionBasica = () => {
        setEditarPerfil("informacion")
    }

    const cambiarAImagen = () => {
        setEditarPerfil("imagen")
    }

    const handleMailChanges = () => {

    }

    return(
        <div className="w-full h-screen ">
            <div className={`bg-gray-700 flex w-full h-44 justify-center items-end`}>
                <div className="w-40 h-40 border-2 absolute top-24 rounded-full bg-gray-50">
                    {/* <img className="rounded-full border-2 h-34 w-4 absolute top-10"  /> */}
                </div>
                <h2 className="absolute top-64 mt-1 text-xl font-semibold" >Sebastian Murillo Alzate</h2>
            </div>
            <div className="flex justify-around w-full h-72 mt-32">
                <div className=" h-100 w-1/5 rounded-md ml-2 ">
                    <div className="w-full py-3 px-5 hover:bg-gray-100 border-l-4 my-2" onClick={cambiarAInformacionBasica}>
                        <button className="font-semibold text-md text-gray-600 hover:text-gray-900 active:text-gray-900">Perfil</button>
                    </div>
                    <div className="w-full py-3 px-5 hover:bg-gray-100 border-l-4" onClick={cambiarAImagen}>
                        <button className="font-semibold text-md text-gray-600 hover:text-gray-900">Imagen de perfil</button>
                    </div>
                </div>

                <div className="border-2 h-100 w-3/4 rounded-md mr-2">
                    {
                        editarPerfil === "informacion" &&
                        <div className="w-100 border-2 flex flex-col">
                            <h2>Informacion basica</h2>
                            <div className="w-100 flex">
                                <div className="w-1/2">
                                    <Input 
                                        type="text"
                                        id="nombre"
                                        theme="#164E63"
                                        label="Nombre:"
                                        flexed
                                        callBack={handleMailChanges}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Input className="W-1/2"
                                        type="text"
                                        id="apellido"
                                        theme="#164E63"
                                        label="Apellido:"
                                        flexed
                                        callBack={handleMailChanges}
                                    />
                                </div>
                            </div>
                            <h2>Informacion de contacto</h2>
                            <Input className="W-1/2"
                                type="email"
                                id="email"
                                theme="#164E63"
                                label="Email:"
                                flexed
                                callBack={handleMailChanges}
                                disabled={"disabled"}
                            />
                        </div>
                    }
                    {
                        editarPerfil === "imagen" &&
                        <div>
                            <h1>Soy la imagen</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;