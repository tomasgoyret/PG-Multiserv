import React from "react";

const Profile = () => {
    return(
        <div className="w-full h-screen ">
            <div className={`bg-gray-700 flex w-full h-44 justify-center items-end`}>
                <div className="w-40 h-40 border-2 absolute top-24 rounded-full bg-gray-50">
                    {/* <img className="rounded-full border-2 h-34 w-4 absolute top-10"  /> */}
                </div>
                <h2 className="absolute top-64 mt-1 text-xl font-semibold" >Sebastian Murillo Alzate</h2>
            </div>
            <div className="flex justify-around w-full h-72 mt-32">
                <div className=" h-100 w-1/5 border-2 rounded-md ml-2">
                    <div className="flex justify-center text-xl font-semibold w-full py-3 px-5 mb-2">
                        <h2>Editar Perfil</h2>
                    </div>
                    <div className="w-full py-3 px-5 hover:bg-gray-100 ">
                        <h2 className="font-semibold text-md text-gray-600 hover:text-gray-900 ">Informacion basica</h2>
                    </div>
                    <div className="w-full py-3 px-5 hover:bg-gray-100">
                        <h2 className="font-semibold text-md text-gray-600 hover:text-gray-900">Imagen de perfil</h2>
                    </div>
                </div>

                <div className="border-2 h-100 w-3/4 rounded-md mr-2">

                </div>
            </div>
        </div>
    )
}

export default Profile;