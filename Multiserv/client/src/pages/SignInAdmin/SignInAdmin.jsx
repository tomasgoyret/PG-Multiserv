import React, { useState } from "react";
import Imagen from "../../../src/assets/images/img1.webp";
import { ImSpinner9 } from "react-icons/im";

const SignInAdmin = () => {
    const [loading, setLoading] = useState(false)

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 shadow-lg">
            <div className="mb-5">
                <img className="w-40 h-auto" src={Imagen} alt="" />
            </div>
            <div className="w-1/3 h-1/2 border-2 flex flex-col justify-center items-center py-5 rounded-md bg-white">
                <div className="w-full flex justify-center font-semibold">
                    <h2 className="text-2xl">Admin</h2>
                </div>
                <div className="w-full my-2 px-4 flex flex-col">
                    <label htmlFor="name" className="text-sm mb-2 font-semibold text-gray-600 mr-4 select-none cursor-pointer">
                        Usuario:
                    </label>
                    <input
                        className="border border-gray-400 p-2 rounded-md font-medium" 
                        type="text"
                        id="name"
                        name="name"
                    />
                    <div className="flex w-full justify-end">
                        <span className="text-sm text-gray-400">{`0/30`}</span>
                    </div>
                </div>

                <div className="w-full my-2 px-4 flex flex-col">
                    <label htmlFor="name" className="text-sm mb-2 font-semibold text-gray-600 mr-4 select-none cursor-pointer">
                        Contraseña:
                    </label>
                    <input
                        className="border border-gray-400 p-2 rounded-md font-medium" 
                        type="text"
                        id="name"
                        name="name"
                    />
                    <div className="flex w-full justify-end">
                        <span className="text-sm text-gray-400">{`0/30`}</span>
                    </div>

                    <div className="w-full mt-4">
                        <button 
                            className="flex w-full flex-nowrap p-2 py-2 px-4 justify-center items-center rounded-md font-semibold bg-green-800 hover:bg-green-900 text-gray-50"
                            onClick={() => {}}
                        >
                          {loading && <ImSpinner9 className="mr-2 animate-spin" />} Ingresar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInAdmin;