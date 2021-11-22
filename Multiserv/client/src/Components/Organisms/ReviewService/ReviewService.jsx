import React, { useEffect } from "react";
import Imagen from "../../../assets/images/img1.webp"
import StarRating from "../../Atoms/StarRating/StarRating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, users, usuarioId } from "../../../redux/actions/actions";

const ReviewService = ({id}) => {
    const dispatch = useDispatch()
    const { reviews, usuarios } = useSelector(state => state)

    useEffect(() => {
        dispatch(getReviews(2))
        dispatch(users())
    }, [])

    let array = [];
    let contador = 0;
    while(reviews[contador]){
        array = usuarios.filter(usuario => {
            if(usuario.uidClient.includes(reviews[contador].usuarioUidClient)){
                ++contador;
                return{
                    ...reviews[contador],
                    displayName: usuario.displayName
                }
            }
        })
    }

    console.log(array)

    return(
        <div className="w-full h-screen">
            <div className="flex justify-center w-full">
                <h2 className="text-3xl text-gray-800 py-5 font-bold">Reseñas</h2>
            </div>
            <div className="w-full h-auto flex flex-col my-5 mx-2">
                {
                    // reviews?.map(async comentario => {
                    //     axios(`http://localhost:3005/usuarios/${comentario.usuarioUidClient}`)
                    //     .then(response => {
                    //         return (
                    //             <div className="flex flex-col w-1/2 h-auto ">
                    //                 <div className="flex items-center"> 
                    //                     <div className="border-2 rounded-full h-10 w-10" >
                    //                         {/* <img src={Imagen} className="w-full h-full" /> */}
                    //                     </div>
                    //                     <h2 className="font-semibold text-1xl ml-2">{response.data.displayName}</h2>
                    //                 </div>
                    //                 <div>
                    //                     <StarRating rating={comentario.rating}/> 
                    //                 </div>
                    //                 <div className="w-full text-md text-gray-700">
                    //                     <span className="w-full">{comentario.details}</span>
                    //                 </div>
                    //             </div>
                    //         )
                    //     })
                        
                    // })
                }
            </div>
        </div>
    )
}

export default ReviewService;