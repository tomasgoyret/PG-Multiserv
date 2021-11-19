import React from "react";
import Imagen from "../../../assets/images/img1.webp"
import StarRating from "../../Atoms/StarRating/StarRating";

const ReviewService = () => {
    const array = [1,2,3,4,5,6,7]

    return(
        <div className="w-full h-screen">
            <div className="flex justify-center w-full">
                <h2 className="text-3xl text-gray-800 py-5 font-bold">Reseñas</h2>
            </div>
            <div className="w-full h-auto flex flex-col my-5 mx-2">
                {
                    array?.map(comentario => 
                    (<div className="flex flex-col w-1/2 h-40 ">
                        <div className="flex items-center"> 
                            <div className="border-2 rounded-full h-10 w-10" >
                                <img src={Imagen} className="w-full h-full" />
                            </div>
                            <h2 className="font-semibold text-1xl ml-2">Sebastian</h2>
                        </div>
                        <div>
                            <StarRating rating={5}/> 
                        </div>
                        <div className="w-full text-md text-gray-700">
                            <span className="w-full">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</span>
                        </div>
                    </div>))
                }
            </div>
        </div>
    )
}

export default ReviewService;