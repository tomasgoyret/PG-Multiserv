import React, { useEffect } from "react";
import Imagen from "../../../assets/images/img1.webp"
import StarRating from "../../Atoms/StarRating/StarRating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, users, usuarioId } from "../../../redux/actions/actions";
import { useLocation } from "react-router";

const ReviewService = ({id}) => {
    const dispatch = useDispatch()
    const { reviews, usuarios } = useSelector(state => state)
    const location = useLocation()
    const current = location.pathname.replace(/\D/g,'')

    useEffect(() => {
        dispatch(getReviews(current))
        dispatch(users())
    }, [])
    console.log(usuarios.map(usuario => usuario.uidClient))

    return(
        <div className="w-full h-screen">
            <div className="flex justify-center w-full">
                <h2 className="text-3xl text-gray-800 py-5 font-bold">Reseñas</h2>
            </div>
            <div className="w-full h-auto flex flex-col my-5 mx-10">
                {
                    reviews?.map(comentario => (
                        <div className="flex flex-col w-1/2 h-auto ">
                            <div className="flex items-center"> 
                                <div className="border-2 rounded-full h-10 w-10" >
                                    <img src='https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg' className="w-full h-full rounded-full" alt='Bill Gates' />
                                </div>
                                <h2 className="font-semibold text-1xl ml-2">Sebas</h2>
                            </div>
                            <div>
                                <StarRating rating={comentario.rating}/> 
                            </div>
                            <div className="w-full text-md text-gray-700">
                                <span className="w-full">{comentario.details}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ReviewService;