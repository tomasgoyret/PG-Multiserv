import React from "react";

const SendReview = () => {
    return(
        <div className="w-full h-28">
            <div className="h-2/6 flex items-center px-5 mt-5 mb-5">
                <span className="text-xl font-sans font-semibold">Agregar review</span>
            </div>
            <div className="w-full flex  h-4/6 px-5">
                <div className="w-4/6">
                    <textarea name="" id="" cols="73" rows="4" className="border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-2 px-2"></textarea>
                </div>
                <div className="w-2/6 flex flex-col items-center">
                    <button className='flex justify-center mx-2 font-semibold  w-auto text-lg px-4 py-2 bg-blue-600 text-gray-50 hover:bg-blue-800 active:bg-blue-700 rounded-md transition-all ease-in-out duration-300' >
                        Comentar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SendReview;